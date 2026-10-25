/* ──────────────────────────────────────────────────────────
   DEVOCIONAL — script principal
   Quatro telas (Hoje, Bíblia, Buscar, Salvos) trocadas pela
   hash da URL, para o botão "voltar" do celular funcionar.
   `verses` vem de versiculos.js.
   ──────────────────────────────────────────────────────────*/

/* ── Utilidades ── */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  /* Algumas chaves antigas guardavam texto puro, sem JSON */
  getRaw(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  },
  setRaw(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  }
};

function capitalizeFirst(text) {
  if (!text) return text;
  const t = text.trimStart();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/* Remove aspas tipográficas que vêm nos arquivos das versões */
function stripQuotes(text) {
  return (text || "").replace(/[“”„‟‘’]/g, "");
}

/* Normaliza para busca: sem acento, minúsculo */
function normalizeForSearch(s) {
  return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

const icon = (name, size = 16) =>
  `<svg class="i" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

const toSup = n => String(n).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("");

function plural(n, um, varios) { return `${n} ${n === 1 ? um : varios}`; }

/* ── Toast ── */
let _toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-on");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("is-on"), 1900);
}

async function copyText(text, msg = "Copiado") {
  try {
    await navigator.clipboard.writeText(text);
    toast(msg);
  } catch {
    /* Fallback para navegadores sem permissão de clipboard */
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast(msg); }
    catch { toast("Não foi possível copiar"); }
    ta.remove();
  }
}

/* ──────────────────────────────────────────────────────────
   DADOS DA BÍBLIA
   versoes/<id>.json → [{ abbrev: "Gn", chapters: [["v1", ...], ...] }]
   ──────────────────────────────────────────────────────────*/
const BIBLE_VERSIONS = [
  { id: "ARA", name: "Almeida Revista e Atualizada" },
  { id: "ARC", name: "Almeida Revista e Corrigida" },
  { id: "NAA", name: "Nova Almeida Atualizada" },
];

const BOOKS_PT = [
  ["GEN","Gênesis","Gn"],["EXO","Êxodo","Êx"],["LEV","Levítico","Lv"],["NUM","Números","Nm"],["DEU","Deuteronômio","Dt"],
  ["JOS","Josué","Js"],["JDG","Juízes","Jz"],["RUT","Rute","Rt"],["1SA","1 Samuel","1Sm"],["2SA","2 Samuel","2Sm"],
  ["1KI","1 Reis","1Rs"],["2KI","2 Reis","2Rs"],["1CH","1 Crônicas","1Cr"],["2CH","2 Crônicas","2Cr"],["EZR","Esdras","Ed"],
  ["NEH","Neemias","Ne"],["EST","Ester","Et"],["JOB","Jó","Jó"],["PSA","Salmos","Sl"],["PRO","Provérbios","Pv"],
  ["ECC","Eclesiastes","Ec"],["SNG","Cantares","Ct"],["ISA","Isaías","Is"],["JER","Jeremias","Jr"],["LAM","Lamentações","Lm"],
  ["EZK","Ezequiel","Ez"],["DAN","Daniel","Dn"],["HOS","Oséias","Os"],["JOL","Joel","Jl"],["AMO","Amós","Am"],
  ["OBA","Obadias","Ob"],["JON","Jonas","Jn"],["MIC","Miquéias","Mq"],["NAM","Naum","Na"],["HAB","Habacuque","Hc"],
  ["ZEP","Sofonias","Sf"],["HAG","Ageu","Ag"],["ZEC","Zacarias","Zc"],["MAL","Malaquias","Ml"],
  ["MAT","Mateus","Mt"],["MRK","Marcos","Mc"],["LUK","Lucas","Lc"],["JHN","João","Jo"],["ACT","Atos","At"],
  ["ROM","Romanos","Rm"],["1CO","1 Coríntios","1Co"],["2CO","2 Coríntios","2Co"],["GAL","Gálatas","Gl"],
  ["EPH","Efésios","Ef"],["PHP","Filipenses","Fp"],["COL","Colossenses","Cl"],["1TH","1 Tessalonicenses","1Ts"],
  ["2TH","2 Tessalonicenses","2Ts"],["1TI","1 Timóteo","1Tm"],["2TI","2 Timóteo","2Tm"],["TIT","Tito","Tt"],
  ["PHM","Filemom","Fm"],["HEB","Hebreus","Hb"],["JAS","Tiago","Tg"],["1PE","1 Pedro","1Pe"],["2PE","2 Pedro","2Pe"],
  ["1JN","1 João","1Jo"],["2JN","2 João","2Jo"],["3JN","3 João","3Jo"],["JUD","Judas","Jd"],["REV","Apocalipse","Ap"]
];
const BOOK_ORDER     = BOOKS_PT.map(b => b[0]);
const USFM_TO_ABBREV = Object.fromEntries(BOOKS_PT.map(b => [b[0], b[2]]));
const OT_COUNT       = 39;

const bookName = id => BOOKS_PT.find(b => b[0] === id)?.[1] ?? id;

const _bibleCache = {};   // { "ARA": Promise<data[]> }

function loadBibleVersion(versionId) {
  if (!_bibleCache[versionId]) {
    _bibleCache[versionId] = fetch(`versoes/${versionId}.json`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      /* Se falhar, tira a promise rejeitada do cache — senão a versão
         fica quebrada até recarregar, mesmo depois da rede voltar. */
      .catch(err => { delete _bibleCache[versionId]; throw err; });
  }
  return _bibleCache[versionId];
}

function getBook(data, bookId) {
  return data.find(b => b.abbrev === USFM_TO_ABBREV[bookId]);
}

/* "ROM.8.38-ROM.8.39" → { book, chapter, verse, endChapter, endVerse } */
function parseApiId(apiId) {
  const [start, end] = apiId.split("-");
  const [book, c, v] = start.split(".");
  const [, ec, ev]   = (end || start).split(".");
  return { book, chapter: +c, verse: +v, endChapter: +ec, endVerse: +ev };
}

/* Versículos de uma passagem: [{ n, chapter, text }] */
async function getPassage(apiId, versionId) {
  const data = await loadBibleVersion(versionId);
  const p    = parseApiId(apiId);
  const book = getBook(data, p.book);
  if (!book) return [];
  const out = [];
  for (let c = p.chapter; c <= p.endChapter; c++) {
    const arr  = book.chapters[c - 1] || [];
    const from = c === p.chapter    ? p.verse    : 1;
    const to   = c === p.endChapter ? p.endVerse : arr.length;
    for (let v = from; v <= to; v++) {
      if (arr[v - 1]) out.push({ n: v, chapter: c, text: stripQuotes(arr[v - 1]).trim() });
    }
  }
  return out;
}

/* Texto para copiar/compartilhar: um versículo vai entre aspas,
   vários vão numerados com sobrescrito, um por linha. */
function formatPassage(items, ref) {
  if (items.length === 1) return `"${capitalizeFirst(items[0].text)}" — ${ref}`;
  return items.map(i => `${toSup(i.n)} ${i.text}`).join("\n") + `\n\n${ref}`;
}

/* Capítulo vizinho, atravessando livros. dir = 1 ou -1.
   Devolve { book, chapter } ou null nos extremos da Bíblia. */
function neighborChapter(data, bookId, chapter, dir) {
  const count = id => getBook(data, id)?.chapters.length ?? 0;
  const c = chapter + dir;
  if (c >= 1 && c <= count(bookId)) return { book: bookId, chapter: c };
  const i = BOOK_ORDER.indexOf(bookId) + dir;
  if (i < 0 || i >= BOOK_ORDER.length) return null;
  const other = BOOK_ORDER[i];
  const total = count(other);
  return total ? { book: other, chapter: dir > 0 ? 1 : total } : null;
}

/* Entende "salmos", "salmos 23", "sl 23:1", "1 co 13 4".
   A parte numérica só é lida no fim, depois de um espaço — assim
   "1 João" e "2 Samuel" continuam sendo nome de livro. */
function parseRefQuery(raw) {
  const q = (raw || "").trim();
  const m = q.match(/^(.+?)[\s,]+(\d+)(?:\s*[:.\s]\s*(\d+))?\s*$/);
  if (!m) return { book: normalizeForSearch(q), raw: q.toLowerCase(), chapter: null, verse: null };
  return { book: normalizeForSearch(m[1]), raw: m[1].toLowerCase(), chapter: +m[2], verse: m[3] ? +m[3] : null };
}

/* Melhor livro para a busca. A sigla exata, com acento, vem antes
   de tudo: "jo" é João e "jó" é Jó, como nas Bíblias impressas.
   Depois, nome exato ganha de "começa com", que ganha de "contém". */
function bestBookMatch(q, raw = "") {
  if (!q) return null;
  const qs = q.replace(/\s+/g, "");
  const rs = raw.replace(/\s+/g, "");
  const cands = BOOKS_PT.map(([id, nome, ab]) => ({
    id, n: normalizeForSearch(nome), ns: normalizeForSearch(nome).replace(/\s+/g, ""),
    ab: normalizeForSearch(ab), abRaw: ab.toLowerCase()
  }));
  return (cands.find(c => rs && c.abRaw === rs)
       ?? cands.find(c => c.n === q || c.ns === qs)
       ?? cands.find(c => c.ab === qs)
       ?? cands.find(c => c.n.startsWith(q) || c.ns.startsWith(qs))
       ?? cands.find(c => c.n.includes(q)))?.id ?? null;
}

/* ──────────────────────────────────────────────────────────
   ORDEM DO DEVOCIONAL
   versiculos.js está agrupado por tema; na ordem do arquivo o app
   passava 12 dias seguidos em "Amor", depois 12 em "Fé"... Aqui a
   lista é embaralhada com semente fixa: a ordem é sempre a mesma em
   todo aparelho, mas os temas se alternam. Mudar a semente muda a
   ordem para todo mundo, então não mexa sem motivo.
   ──────────────────────────────────────────────────────────*/
function seededShuffle(arr, seed) {
  const a = [...arr];
  let t = seed >>> 0;
  const rand = () => {           // mulberry32
    t = (t + 0x6D2B79F5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ORDERED = seededShuffle(verses, 20240101);

/* ──────────────────────────────────────────────────────────
   ESTADO
   ──────────────────────────────────────────────────────────*/
const KEYS = {
  favs:     "devocional-favorites",
  mode:     "devocional-mode",
  scale:    "devocional-readingScale",
  version:  "devocional-version",
  readDays: "devocional-readDays",
  lastRead: "devocional-lastRead",
  notes:    "devocional-notes",
  plans:    "devocional-plans",
  ttsRate:  "devocional-ttsRate",
};

const S = {
  view:    "hoje",
  theme:   "Todos",
  version: store.getRaw(KEYS.version, "ARA"),
  pool:    ORDERED,
  idx:     0,
  reader:  { book: null, chapter: null, source: null, fromToday: false, screen: "books" },
  sel:     new Set(),
  searchScope: "dev",
  savedFilter: "all",
};
if (!BIBLE_VERSIONS.some(v => v.id === S.version)) S.version = "ARA";

/* ──────────────────────────────────────────────────────────
   APARÊNCIA (sistema / claro / escuro)
   ──────────────────────────────────────────────────────────*/
const darkQuery = matchMedia("(prefers-color-scheme: dark)");

function getMode() { return store.getRaw(KEYS.mode, "system"); }

function applyMode(mode = getMode()) {
  const resolved = mode === "system" ? (darkQuery.matches ? "dark" : "light") : mode;
  document.documentElement.setAttribute("data-theme", resolved);
  $("#metaTheme")?.setAttribute("content", resolved === "dark" ? "#15120F" : "#F5F0E6");
}

function setMode(mode) {
  store.setRaw(KEYS.mode, mode);
  applyMode(mode);
}

darkQuery.addEventListener?.("change", () => { if (getMode() === "system") applyMode(); });

/* ── Tamanho do texto de leitura (5 níveis) ── */
const READING_SCALES = [
  { label: "Pequeno",      size: "1.04rem", line: "1.7"  },
  { label: "Médio-pequeno",size: "1.13rem", line: "1.72" },
  { label: "Médio",        size: "1.22rem", line: "1.75" },
  { label: "Médio-grande", size: "1.38rem", line: "1.78" },
  { label: "Grande",       size: "1.58rem", line: "1.8"  },
];

function setReadingScale(step, persist = true) {
  const i = Math.min(READING_SCALES.length - 1, Math.max(0, parseInt(step) - 1 || 0));
  const s = READING_SCALES[i];
  document.documentElement.style.setProperty("--reading-size", s.size);
  document.documentElement.style.setProperty("--reading-line", s.line);
  if (persist) store.setRaw(KEYS.scale, String(i + 1));
  const lbl = $("#scaleLabel");
  if (lbl) lbl.textContent = s.label;
}

/* ──────────────────────────────────────────────────────────
   NAVEGAÇÃO ENTRE TELAS
   ──────────────────────────────────────────────────────────*/
const VIEWS = ["hoje", "biblia", "busca", "salvos"];

function viewFromHash() {
  const h = location.hash.replace("#", "");
  return VIEWS.includes(h) ? h : "hoje";
}

function showView(view) {
  const changed = S.view !== view;
  S.view = view;
  VIEWS.forEach(v => { $(`#view-${v}`).hidden = v !== view; });
  $$("[data-nav]").forEach(a => {
    const on = a.dataset.nav === view;
    a.classList.toggle("is-on", on);
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  if (view !== "biblia") clearSelection();

  if (view === "biblia" && !$("#bibleBody").innerHTML) renderBible();
  if (view === "salvos") renderSaved();
  if (view === "busca") {
    renderSearch();
    if (changed && matchMedia("(hover: hover)").matches) setTimeout(() => $("#searchInput").focus(), 50);
  }
  /* No leitor quem decide a rolagem é o renderReader (pode ir até um versículo) */
  if (changed && !(view === "biblia" && S.reader.screen === "read")) window.scrollTo(0, 0);
}

/* Troca de tela na hora (pushState não dispara hashchange). O
   hashchange continua cuidando do "voltar" e dos links das abas. */
function goView(view) {
  if (location.hash !== `#${view}`) history.pushState(null, "", `#${view}`);
  showView(view);
}

window.addEventListener("hashchange", () => showView(viewFromHash()));

/* ──────────────────────────────────────────────────────────
   HOJE
   ──────────────────────────────────────────────────────────*/
let _showToken = 0;

/* Dias corridos desde uma data fixa, no fuso local. Usar o dia do
   ano deixava de fora tudo depois do item 365 e repetia a mesma
   sequência todo ano. Date.UTC com a data local evita o erro de
   1 dia em fusos com horário de verão. */
const EPOCH = Date.UTC(2024, 0, 1);
function daysSinceEpoch(d = new Date()) {
  return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EPOCH) / 86400000);
}

const dayIndex = () => ((daysSinceEpoch() % S.pool.length) + S.pool.length) % S.pool.length;

function renderDate() {
  const d = new Date();
  const txt = d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  $("#todayDate").textContent = txt;
}

function renderThemeChips() {
  const counts = {};
  verses.forEach(v => { counts[v.theme] = (counts[v.theme] || 0) + 1; });
  const themes = ["Todos", ...Object.keys(counts)];
  $("#themeChips").innerHTML = themes.map(t => `
    <button class="chip ${t === S.theme ? "is-on" : ""}" role="option" aria-selected="${t === S.theme}" data-theme-chip="${escapeHtml(t)}">
      ${escapeHtml(t)}${t !== "Todos" ? `<span class="chip__n">${counts[t]}</span>` : ""}
    </button>`).join("");
}

function selectTheme(theme) {
  S.theme = theme;
  S.pool  = theme === "Todos" ? ORDERED : ORDERED.filter(v => v.theme === theme);
  S.idx   = dayIndex();
  $$("#themeChips .chip").forEach(c => {
    const on = c.dataset.themeChip === theme;
    c.classList.toggle("is-on", on);
    c.setAttribute("aria-selected", on);
    if (on) c.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  });
  showVerse();
}

async function showVerse() {
  const item = S.pool[S.idx];
  if (!item) return;
  flushNote();
  const token  = ++_showToken;
  const textEl = $("#verseText");
  const isToday = S.idx === dayIndex();

  textEl.classList.add("is-loading");
  $("#verseRef").textContent = item.ref;
  $("#verseVer").textContent = S.version;
  $("#verseCtx").textContent = item.ctx;
  $("#todayTitle").textContent = isToday ? "Palavra de hoje" : (S.theme === "Todos" ? "Devocional" : S.theme);
  $("#verseCount").textContent = `${S.idx + 1} de ${S.pool.length}`;
  $("#todayBtn").hidden = isToday;
  $("#progressFill").style.width = `${((S.idx + 1) / S.pool.length) * 100}%`;

  /* Um mesmo versículo pode aparecer em mais de um tema */
  const themes = [...new Set(verses.filter(v => v.apiId === item.apiId).map(v => v.theme))];
  $("#verseTheme").innerHTML = themes.map(escapeHtml).join('<span class="tag__sep">·</span>');

  updateFavBtn();
  renderRelated(item);
  loadTodayNote(item);
  if (TTS.kind === "today") ttsStop();

  try {
    const items = await getPassage(item.apiId, S.version);
    if (token !== _showToken) return;
    textEl.innerHTML = items.length > 1
      ? items.map(i => `<sup>${i.n}</sup>${escapeHtml(i.text)}`).join(" ")
      : escapeHtml(capitalizeFirst(items[0]?.text || ""));
  } catch (err) {
    console.error("Erro ao buscar versículo:", err);
    if (token !== _showToken) return;
    textEl.textContent = "Não foi possível carregar o versículo. Verifique sua conexão.";
  } finally {
    if (token === _showToken) textEl.classList.remove("is-loading");
  }
}

function go(dir) {
  if (!S.pool.length) return;
  S.idx = (S.idx + dir + S.pool.length) % S.pool.length;
  showVerse();
}

function goRandom() {
  if (S.pool.length <= 1) return;
  let n;
  do { n = Math.floor(Math.random() * S.pool.length); } while (n === S.idx);
  S.idx = n;
  showVerse();
}

function goToday() {
  S.idx = dayIndex();
  showVerse();
}

/* Vai para um item do devocional (busca, favoritos, relacionados) */
function openDevotional(apiId, theme) {
  let i = S.pool.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (i === -1) {
    S.theme = "Todos";
    S.pool  = ORDERED;
    renderThemeChips();
    i = S.pool.findIndex(v => v.apiId === apiId && v.theme === theme);
  }
  if (i === -1) return;
  S.idx = i;
  showVerse();
  goView("hoje");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderRelated(item) {
  const related = verses
    .filter(v => v.theme === item.theme && v.apiId !== item.apiId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  $("#relatedBlock").hidden = related.length === 0;
  $("#relatedList").innerHTML = related.map(v => `
    <button class="mini-card" data-dev="${escapeHtml(v.apiId)}" data-dev-theme="${escapeHtml(v.theme)}">
      <span class="mini-card__ref">${escapeHtml(v.ref)}</span>
      <span class="mini-card__text">${escapeHtml(v.ctx)}</span>
    </button>`).join("");
}

async function currentPassageText() {
  const item  = S.pool[S.idx];
  const items = await getPassage(item.apiId, S.version);
  return { item, items, text: formatPassage(items, `${item.ref} (${S.version})`) };
}

async function copyVerse() {
  const { text } = await currentPassageText();
  copyText(text, "Versículo copiado");
}

function openChapterFromToday() {
  const item = S.pool[S.idx];
  const p    = parseApiId(item.apiId);
  const ids  = [];
  for (let v = p.verse; v <= (p.chapter === p.endChapter ? p.endVerse : p.verse); v++) ids.push(v);
  openReader(p.book, p.chapter, { source: ids, fromToday: true });
}

/* ──────────────────────────────────────────────────────────
   SEQUÊNCIA DE LEITURA
   Guarda os dias (AAAA-MM-DD) em que a leitura foi marcada.
   ──────────────────────────────────────────────────────────*/
const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function getReadDays() { return new Set(store.get(KEYS.readDays, [])); }

function computeStreak(days) {
  const d = new Date();
  /* Se hoje ainda não foi marcado, a sequência de ontem continua valendo */
  if (!days.has(dateKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(dateKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

function renderStreak() {
  const days   = getReadDays();
  const streak = computeStreak(days);
  const today  = new Date();
  const doneToday = days.has(dateKey(today));

  $("#streakNum").textContent = streak;
  $("#streakBtn").classList.toggle("is-hot", streak > 0);
  $("#streakBtn").setAttribute("aria-label", `Sequência: ${plural(streak, "dia", "dias")}`);

  $("#doneBtn").classList.toggle("is-done", doneToday);
  $("#doneLabel").textContent = doneToday
    ? "Leitura de hoje feita"
    : "Marcar a leitura de hoje como feita";

  /* Semana corrente, de domingo a sábado */
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  const letters = ["D", "S", "T", "Q", "Q", "S", "S"];
  $("#weekStrip").innerHTML = letters.map((l, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const k = dateKey(d);
    const cls = [
      "week__day",
      k === dateKey(today) ? "is-today" : "",
      days.has(k) ? "is-done" : "",
      d > today ? "is-future" : ""
    ].join(" ");
    return `<div class="${cls}" title="${d.toLocaleDateString("pt-BR")}">
      <span>${l}</span>
      <span class="week__dot">${days.has(k) ? icon("check", 12) : ""}</span>
    </div>`;
  }).join("");
}

function toggleDone() {
  const days = getReadDays();
  const k = dateKey();
  if (days.has(k)) days.delete(k);
  else {
    days.add(k);
    const s = computeStreak(days);
    toast(s > 1 ? `${s} dias seguidos. Continue assim!` : "Leitura de hoje registrada");
  }
  store.set(KEYS.readDays, [...days].sort().slice(-400));
  renderStreak();
}

function showStreakInfo() {
  const days = getReadDays();
  const streak = computeStreak(days);
  openSheet("Sua sequência", `
    <div class="empty" style="padding:16px 0 8px">
      <p class="empty__title" style="font-size:3rem;color:var(--gold);margin:0">${streak}</p>
      <p>${streak === 1 ? "dia seguido" : "dias seguidos"} de leitura</p>
    </div>
    <div class="field"><span class="field__label">Total</span>${plural(days.size, "dia lido", "dias lidos")}</div>
    <p class="foot-note">Marque a leitura no fim da reflexão de cada dia. Se um dia passar sem marcar, a sequência recomeça.</p>
  `);
}

/* ──────────────────────────────────────────────────────────
   FAVORITOS
   { apiId, ref, theme, ctx, source? } — source "biblia" vem do leitor
   ──────────────────────────────────────────────────────────*/
const getFavorites  = () => store.get(KEYS.favs, []);
const saveFavorites = favs => store.set(KEYS.favs, favs);

function isDevFavorite(item) {
  return getFavorites().some(f => f.source !== "biblia" && f.apiId === item.apiId && f.theme === item.theme);
}

function updateFavBtn() {
  const item = S.pool[S.idx];
  const on = !!item && isDevFavorite(item);
  const btn = $("#favBtn");
  btn.classList.toggle("is-on", on);
  btn.setAttribute("aria-pressed", on);
  $("#favLabel").textContent = on ? "Salvo" : "Salvar";
}

function toggleFavorite() {
  const item = S.pool[S.idx];
  if (!item) return;
  let favs = getFavorites();
  const match = f => f.source !== "biblia" && f.apiId === item.apiId && f.theme === item.theme;
  if (favs.some(match)) {
    favs = favs.filter(f => !match(f));
    toast("Removido dos salvos");
  } else {
    favs.unshift({ apiId: item.apiId, ref: item.ref, theme: item.theme, ctx: item.ctx, savedAt: Date.now() });
    toast("Salvo");
  }
  saveFavorites(favs);
  updateFavBtn();
  const btn = $("#favBtn");
  btn.classList.add("is-pulse");
  setTimeout(() => btn.classList.remove("is-pulse"), 450);
}

async function renderSaved() {
  const all  = getFavorites();
  const list = $("#savedList");
  const nNotes = Object.keys(getNotes()).length;
  const favs = all
    .map((f, i) => ({ ...f, _i: i }))
    .filter(f => S.savedFilter === "all"
      || (S.savedFilter === "bible" ? f.source === "biblia" : f.source !== "biblia"));

  $("#savedCount").textContent = [
    all.length ? plural(all.length, "salvo", "salvos") : "",
    nNotes ? plural(nNotes, "anotação", "anotações") : ""
  ].filter(Boolean).join(" · ");
  $$("#savedFilter button").forEach(b => {
    const on = b.dataset.filter === S.savedFilter;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-selected", on);
  });

  if (S.savedFilter === "notes") return renderNotesList(list);

  if (!favs.length) {
    list.innerHTML = `
      <div class="empty">
        ${icon("heart", 44)}
        <p class="empty__title">${all.length ? "Nada neste filtro" : "Nenhum versículo salvo"}</p>
        <p>${all.length ? "Tente outro filtro acima." : "Toque em Salvar no devocional, ou selecione versículos na Bíblia."}</p>
      </div>`;
    return;
  }

  list.innerHTML = favs.map(f => {
    const fromBible = f.source === "biblia";
    return `
      <article class="saved-item">
        <div class="saved-item__top">
          <span class="saved-item__ref">${escapeHtml(f.ref)}</span>
          <span class="tag ${fromBible ? "tag--muted" : ""}">${fromBible ? "Bíblia" : escapeHtml(f.theme)}</span>
        </div>
        <p class="saved-item__text" data-fav-text="${f._i}">${fromBible ? escapeHtml(f.ctx) : "…"}</p>
        <div class="saved-item__acts">
          <button class="text-btn" data-fav-open="${f._i}">${icon(fromBible ? "book" : "sunrise", 14)} Abrir</button>
          <button class="text-btn" data-fav-copy="${f._i}">${icon("copy", 14)} Copiar</button>
          <button class="text-btn" data-fav-remove="${f._i}" aria-label="Remover dos salvos">${icon("trash", 14)}</button>
        </div>
      </article>`;
  }).join("");

  /* Devocionais guardam a reflexão, não o texto: busca na versão atual */
  for (const f of favs) {
    if (f.source === "biblia") continue;
    try {
      const items = await getPassage(f.apiId, S.version);
      const el = list.querySelector(`[data-fav-text="${f._i}"]`);
      if (el) el.textContent = capitalizeFirst(items.map(i => i.text).join(" "));
    } catch {}
  }
}

function removeFavorite(i) {
  const favs = getFavorites();
  const [gone] = favs.splice(i, 1);
  saveFavorites(favs);
  renderSaved();
  updateFavBtn();
  if (gone) toast("Removido dos salvos");
}

function openFavorite(i) {
  const f = getFavorites()[i];
  if (!f) return;
  if (f.source === "biblia") {
    const p = parseApiId(f.apiId);
    const ids = [];
    for (let v = p.verse; v <= p.endVerse; v++) ids.push(v);
    openReader(p.book, p.chapter, { source: ids });
  } else {
    openDevotional(f.apiId, f.theme);
  }
}

async function copyFavorite(i) {
  const f = getFavorites()[i];
  if (!f) return;
  const items = await getPassage(f.apiId, S.version);
  copyText(formatPassage(items, `${f.ref} (${S.version})`));
}

/* ── Backup ── */
function exportBackup() {
  const payload = {
    app: "devocional-helper",
    exportedAt: new Date().toISOString(),
    favorites: getFavorites(),
    readDays: [...getReadDays()],
    notes: getNotes(),
    plans: getPlanState(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `devocional-backup-${dateKey()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Backup baixado");
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const incoming = Array.isArray(data) ? data : data.favorites;
      if (!Array.isArray(incoming)) throw new Error("formato");
      const favs = getFavorites();
      const key  = f => `${f.source || "dev"}|${f.apiId}|${f.theme}`;
      const have = new Set(favs.map(key));
      let added = 0;
      incoming.forEach(f => {
        if (f && typeof f.apiId === "string" && typeof f.ref === "string" && !have.has(key(f))) {
          favs.push(f); have.add(key(f)); added++;
        }
      });
      saveFavorites(favs);
      if (Array.isArray(data.readDays)) {
        const days = getReadDays();
        data.readDays.forEach(d => { if (/^\d{4}-\d{2}-\d{2}$/.test(d)) days.add(d); });
        store.set(KEYS.readDays, [...days].sort().slice(-400));
        renderStreak();
      }
      /* Anotações: fica a mais recente. Planos: soma o que foi lido. */
      if (data.notes && typeof data.notes === "object") {
        const notes = getNotes();
        Object.entries(data.notes).forEach(([k, n]) => {
          if (!n || typeof n.text !== "string") return;
          if (!notes[k] || (n.updatedAt || 0) > (notes[k].updatedAt || 0)) { notes[k] = n; added++; }
        });
        store.set(KEYS.notes, notes);
      }
      if (data.plans && typeof data.plans === "object") {
        const st = getPlanState();
        Object.entries(data.plans).forEach(([id, p]) => {
          if (!PLANS.some(x => x.id === id) || !p) return;
          if (!st[id]) st[id] = p;
          else st[id].done = { ...(st[id].done || {}), ...(p.done || {}) };
        });
        savePlanState(st);
        renderPlanToday();
      }
      updateFavBtn();
      loadTodayNote(S.pool[S.idx]);
      if (S.view === "salvos") renderSaved();
      closeSheet();
      toast(added ? `${plural(added, "item importado", "itens importados")}` : "Nada novo para importar");
    } catch {
      toast("Arquivo de backup inválido");
    }
  };
  reader.readAsText(file);
}

/* ──────────────────────────────────────────────────────────
   BÍBLIA — escolher livro, capítulo e ler
   ──────────────────────────────────────────────────────────*/
function saveLastRead() {
  const r = S.reader;
  if (r.book) store.set(KEYS.lastRead, { book: r.book, chapter: r.chapter });
}

function renderBible() {
  if (S.reader.screen === "plans") return renderPlans();
  if (S.reader.screen === "plan" && S.reader.planId) return renderPlan(S.reader.planId);
  if (S.reader.screen === "read" && S.reader.book) return renderReader();
  if (S.reader.screen === "chapters" && S.reader.book) return renderChapters(S.reader.book);
  renderBooks();
}

function renderBooks() {
  S.reader.screen = "books";
  clearSelection();
  const last = store.get(KEYS.lastRead, null);

  const list = (ids) => ids.map(id => `
    <button class="book-btn ${id === last?.book ? "is-current" : ""}" data-book="${id}" data-name="${normalizeForSearch(bookName(id))}">
      ${escapeHtml(bookName(id))}
    </button>`).join("");

  $("#bibleBody").innerHTML = `
    <div class="bible-head">
      <h1 class="display" style="margin-bottom:16px">Bíblia</h1>
      ${last ? `
        <button class="continue-card" data-continue>
          <span class="continue-card__icon">${icon("book", 20)}</span>
          <span class="continue-card__txt">
            <span class="continue-card__k">Continuar lendo</span>
            <span class="continue-card__v">${escapeHtml(bookName(last.book))} ${last.chapter}</span>
          </span>
          ${icon("chev-r", 18)}
        </button>` : ""}
      ${plansHomeHtml()}
      <label class="search-field">
        ${icon("search", 18)}
        <input type="search" id="bookFilter" placeholder="Livro ou referência (ex: sl 23)" autocomplete="off" enterkeyhint="go" />
      </label>
      <p class="hint" id="bookHint" hidden></p>
    </div>
    <div id="bookLists">
      <section class="testament" data-testament>
        <div class="testament__head"><h2 class="section-label">Antigo Testamento</h2><span class="muted">39 livros</span></div>
        <div class="book-list">${list(BOOK_ORDER.slice(0, OT_COUNT))}</div>
      </section>
      <section class="testament" data-testament>
        <div class="testament__head"><h2 class="section-label">Novo Testamento</h2><span class="muted">27 livros</span></div>
        <div class="book-list">${list(BOOK_ORDER.slice(OT_COUNT))}</div>
      </section>
      <div class="empty" id="bookEmpty" hidden><p class="empty__title">Nenhum livro com esse nome</p></div>
    </div>`;

  const input = $("#bookFilter");
  input.addEventListener("input", () => filterBooks(input.value));
  input.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    jumpToRef(input.value);
  });
}

function filterBooks(value) {
  const { book, raw, chapter, verse } = parseRefQuery(value);
  let any = false;
  $$("#bookLists [data-testament]").forEach(sec => {
    let secAny = false;
    $$(".book-btn", sec).forEach(btn => {
      const ok = !book || btn.dataset.name.includes(book) || normalizeForSearch(USFM_TO_ABBREV[btn.dataset.book]) === book.replace(/\s+/g, "");
      btn.hidden = !ok;
      if (ok) secAny = true;
    });
    sec.hidden = !secAny;
    if (secAny) any = true;
  });
  $("#bookEmpty").hidden = any;

  const hint = $("#bookHint");
  const target = bestBookMatch(book, raw);
  if (book && target) {
    hint.innerHTML = `${icon("chev-r", 14)} Enter abre ${escapeHtml(bookName(target))}${chapter ? ` ${chapter}${verse ? ":" + verse : ""}` : ""}`;
    hint.hidden = false;
  } else {
    hint.hidden = true;
  }
}

/* Abre uma referência digitada. Sem capítulo, mostra a lista. */
function jumpToRef(value) {
  const { book, raw, chapter, verse } = parseRefQuery(value);
  const target = bestBookMatch(book, raw);
  if (!target) return false;
  if (chapter) return openReader(target, chapter, { source: verse ? [verse] : null }), true;
  if (S.view !== "biblia") goView("biblia");
  renderChapters(target);
  return true;
}

async function renderChapters(bookId) {
  S.reader.screen = "chapters";
  S.reader.book   = bookId;
  clearSelection();
  const body = $("#bibleBody");
  body.innerHTML = `<div class="loading">Carregando…</div>`;
  try {
    const data  = await loadBibleVersion(S.version);
    const total = getBook(data, bookId)?.chapters.length ?? 0;
    const last  = store.get(KEYS.lastRead, null);
    body.innerHTML = `
      <div class="back-row">
        <button class="text-btn" data-books>${icon("chev-l", 14)} Livros</button>
      </div>
      <h1 class="display">${escapeHtml(bookName(bookId))}</h1>
      <p class="muted">${plural(total, "capítulo", "capítulos")}</p>
      <div class="num-grid">
        ${Array.from({ length: total }, (_, i) => `
          <button class="num-btn ${last?.book === bookId && last.chapter === i + 1 ? "is-current" : ""}" data-chapter="${i + 1}">${i + 1}</button>`).join("")}
      </div>`;
    window.scrollTo(0, 0);
  } catch {
    body.innerHTML = errorBlock("Não foi possível carregar os capítulos.");
  }
}

function errorBlock(msg) {
  return `<div class="empty"><p class="empty__title">Algo deu errado</p><p>${escapeHtml(msg)}</p></div>`;
}

/* Abre o leitor. opts.source = números de versículo para destacar */
function openReader(book, chapter, opts = {}) {
  Object.assign(S.reader, {
    book, chapter,
    screen: "read",
    source: opts.source || null,
    fromToday: !!opts.fromToday,
  });
  if (S.view !== "biblia") goView("biblia");
  renderReader();
}

let _readerToken = 0;
let _chapterVerses = [];   // textos do capítulo aberto, para copiar

async function renderReader(opts = {}) {
  const r     = S.reader;
  const body  = $("#bibleBody");
  const token = ++_readerToken;
  clearSelection();
  if (TTS.kind === "chapter" && !opts.autoplay) ttsStop();

  body.innerHTML = `
    <div class="reader-bar">
      <button class="icon-btn" data-books aria-label="Todos os livros">${icon("grid", 18)}</button>
      <button class="icon-btn" data-reader-go="-1" aria-label="Capítulo anterior">${icon("chev-l", 20)}</button>
      <button class="reader-bar__ref" data-chapters>
        <span>${escapeHtml(bookName(r.book))} ${r.chapter}</span>${icon("chev-d", 14)}
      </button>
      <button class="icon-btn" data-reader-go="1" aria-label="Próximo capítulo">${icon("chev-r", 20)}</button>
      ${TTS.supported ? `<button class="icon-btn" data-listen-chapter aria-label="Ouvir o capítulo">${icon("volume", 18)}</button>` : ""}
      <button class="icon-btn" data-text-size aria-label="Tamanho do texto">${icon("text", 18)}</button>
    </div>
    ${r.fromToday ? `<button class="back-banner" data-back-today>${icon("arrow-l", 15)} Voltar ao devocional</button>` : ""}
    <div class="loading">Carregando…</div>`;

  try {
    const data = await loadBibleVersion(S.version);
    if (token !== _readerToken) return;
    const book = getBook(data, r.book);
    if (!book) throw new Error("Livro não encontrado");
    r.chapter = Math.min(Math.max(1, r.chapter), book.chapters.length);
    const arr  = book.chapters[r.chapter - 1] || [];
    const prev = neighborChapter(data, r.book, r.chapter, -1);
    const next = neighborChapter(data, r.book, r.chapter, 1);
    r.prev = prev; r.next = next;
    _chapterVerses = arr.map(t => stripQuotes(t).trim());

    const saved  = savedVersesIn(r.book, r.chapter);
    const source = new Set(r.source || []);

    const verseHtml = _chapterVerses.map((t, i) => {
      const n = i + 1;
      const cls = ["rv", saved.has(n) ? "is-saved" : "", source.has(n) ? "is-source" : ""].join(" ");
      return `<span class="${cls}" data-v="${n}" id="v${n}"><span class="rv__n">${n}</span>${escapeHtml(t)}</span>`;
    }).join(" ");

    body.querySelector(".loading").outerHTML = `
      <article class="reading" id="reading">
        <header class="reading__head">
          <span class="reading__book">${escapeHtml(bookName(r.book))} · ${S.version}</span>
          <span class="reading__chap">${r.chapter}</span>
        </header>
        <div id="planChip"></div>
        <div class="reading__body">${verseHtml}</div>
        <div id="planFoot"></div>
        <nav class="chapter-nav">
          <button class="chapter-nav__btn" data-reader-go="-1" ${prev ? "" : "disabled"}>
            <small>Anterior</small><span>${prev ? escapeHtml(`${bookName(prev.book)} ${prev.chapter}`) : "—"}</span>
          </button>
          <button class="chapter-nav__btn chapter-nav__btn--next" data-reader-go="1" ${next ? "" : "disabled"}>
            <small>Próximo</small><span>${next ? escapeHtml(`${bookName(next.book)} ${next.chapter}`) : "—"}</span>
          </button>
        </nav>
      </article>`;

    $$("[data-reader-go='-1']", body).forEach(b => b.disabled = !prev);
    $$("[data-reader-go='1']", body).forEach(b => b.disabled = !next);
    saveLastRead();
    decorateReader();
    renderPlanReader();
    if (opts.autoplay) listenChapter();

    const first = r.source?.[0];
    if (first && $(`#v${first}`)) {
      requestAnimationFrame(() => {
        const el  = $(`#v${first}`);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  } catch (e) {
    if (token !== _readerToken) return;
    const l = body.querySelector(".loading");
    if (l) l.outerHTML = errorBlock("Não foi possível carregar o capítulo. Verifique sua conexão.");
  }
}

function readerGo(dir, opts) {
  const target = dir > 0 ? S.reader.next : S.reader.prev;
  if (!target) return;
  S.reader.book    = target.book;
  S.reader.chapter = target.chapter;
  S.reader.source  = null;
  renderReader(opts);
}

/* Versículos deste capítulo que já estão nos salvos */
function savedVersesIn(book, chapter) {
  const set = new Set();
  getFavorites().forEach(f => {
    const p = parseApiId(f.apiId);
    if (p.book !== book) return;
    for (let c = p.chapter; c <= p.endChapter; c++) {
      if (c !== chapter) continue;
      const from = c === p.chapter ? p.verse : 1;
      const to   = c === p.endChapter ? p.endVerse : 200;
      for (let v = from; v <= to; v++) set.add(v);
    }
  });
  return set;
}

/* ── Seleção de versículos no leitor ── */
function toggleVerse(n, el) {
  if (S.sel.has(n)) { S.sel.delete(n); el.classList.remove("is-sel"); }
  else              { S.sel.add(n);    el.classList.add("is-sel"); }
  updateSelBar();
}

function clearSelection() {
  S.sel.clear();
  $$(".rv.is-sel").forEach(el => el.classList.remove("is-sel"));
  updateSelBar();
}

/* Referência compacta: "João 3:16-18, 20" */
function selectionData() {
  const nums = [...S.sel].sort((a, b) => a - b);
  if (!nums.length) return null;
  const parts = [];
  let a = nums[0], b = nums[0];
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i] === b + 1) { b = nums[i]; continue; }
    parts.push(a === b ? `${a}` : `${a}-${b}`);
    a = b = nums[i];
  }
  const r = S.reader;
  const min = nums[0], max = nums[nums.length - 1];
  return {
    nums,
    ref: `${bookName(r.book)} ${r.chapter}:${parts.join(", ")}`,
    /* Mesmo formato dos apiId do devocional, para os salvos ficarem numa lista só */
    apiId: min === max ? `${r.book}.${r.chapter}.${min}` : `${r.book}.${r.chapter}.${min}-${r.book}.${r.chapter}.${max}`,
    items: nums.map(n => ({ n, text: _chapterVerses[n - 1] })),
  };
}

function isSelectionSaved(d) {
  return !!d && getFavorites().some(f => f.source === "biblia" && f.apiId === d.apiId);
}

function updateSelBar() {
  const bar = $("#selBar");
  const d = selectionData();
  bar.classList.toggle("is-open", !!d);
  if (!d) return;
  $("#selRef").textContent = d.ref;
  const saved = isSelectionSaved(d);
  $("#selFav").classList.toggle("is-on", saved);
  $("#selFav").setAttribute("aria-label", saved ? "Remover dos salvos" : "Salvar seleção");
}

function saveSelection() {
  const d = selectionData();
  if (!d) return;
  let favs = getFavorites();
  const i = favs.findIndex(f => f.source === "biblia" && f.apiId === d.apiId);
  if (i === -1) {
    favs.unshift({
      apiId: d.apiId, ref: d.ref, theme: null, source: "biblia", savedAt: Date.now(),
      ctx: d.items.map(x => x.text).join(" ")
    });
    toast("Salvo");
  } else {
    favs.splice(i, 1);
    toast("Removido dos salvos");
  }
  saveFavorites(favs);
  decorateReader();
  updateSelBar();
}

function noteSelection() {
  const d = selectionData();
  if (d) openNoteEditor(d.apiId, d.ref, d.items.map(i => i.text).join(" "));
}

function compareSelection() {
  const d = selectionData();
  if (!d) return;
  const { book, chapter } = S.reader;
  openCompare(d.ref, async v => {
    const data = await loadBibleVersion(v);
    const arr  = getBook(data, book)?.chapters[chapter - 1] || [];
    return d.nums.map(n => ({ n, text: stripQuotes(arr[n - 1] || "").trim() }));
  });
}

function shareSelection() {
  const d = selectionData();
  if (d) openShareSheet(d.items, d.ref);
}

/* ──────────────────────────────────────────────────────────
   BUSCA
   ──────────────────────────────────────────────────────────*/
const _searchIndex = {};   // { "ARA": Promise<[{b, c, v, t, n}]> }

function getSearchIndex(versionId) {
  if (!_searchIndex[versionId]) {
    _searchIndex[versionId] = loadBibleVersion(versionId).then(data => {
      const out = [];
      data.forEach(book => {
        const id = BOOKS_PT.find(b => b[2] === book.abbrev)?.[0];
        if (!id) return;
        book.chapters.forEach((ch, ci) => ch.forEach((t, vi) => {
          const text = stripQuotes(t).trim();
          out.push({ b: id, c: ci + 1, v: vi + 1, t: text, n: normalizeForSearch(text) });
        }));
      });
      return out;
    }).catch(err => { delete _searchIndex[versionId]; throw err; });
  }
  return _searchIndex[versionId];
}

/* Destaca as palavras buscadas. Funciona porque, em texto com letras
   já compostas, tirar o acento não muda o tamanho da string. */
function highlight(text, norm, words) {
  if (norm.length !== text.length) return escapeHtml(text);
  const ranges = [];
  words.forEach(w => {
    let i = norm.indexOf(w);
    while (i !== -1) { ranges.push([i, i + w.length]); i = norm.indexOf(w, i + w.length); }
  });
  if (!ranges.length) return escapeHtml(text);
  ranges.sort((a, b) => a[0] - b[0]);
  let html = "", pos = 0;
  ranges.forEach(([s, e]) => {
    if (s < pos) return;
    html += escapeHtml(text.slice(pos, s)) + `<mark>${escapeHtml(text.slice(s, e))}</mark>`;
    pos = e;
  });
  return html + escapeHtml(text.slice(pos));
}

let _searchTimer, _searchToken = 0;

function onSearchInput() {
  $("#searchClear").hidden = !$("#searchInput").value;
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(renderSearch, S.searchScope === "bible" ? 250 : 80);
}

function setSearchScope(scope) {
  S.searchScope = scope;
  $$(".search-head .segmented button").forEach(b => {
    const on = b.dataset.scope === scope;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-selected", on);
  });
  renderSearch();
}

async function renderSearch() {
  const raw   = $("#searchInput").value.trim();
  const q     = normalizeForSearch(raw);
  const out   = $("#searchResults");
  const token = ++_searchToken;

  /* Atalho: se parece uma referência, oferece abrir direto */
  const ref    = parseRefQuery(raw);
  const target = ref.chapter ? bestBookMatch(ref.book, ref.raw) : null;
  const jump = target ? `
    <button class="jump-card" data-jump="${escapeHtml(raw)}">
      ${icon("book", 18)}<span>Abrir ${escapeHtml(bookName(target))} ${ref.chapter}${ref.verse ? ":" + ref.verse : ""}</span>${icon("chev-r", 18)}
    </button>` : "";

  if (q.length < 2) {
    const themes = [...new Set(verses.map(v => v.theme))].slice(0, 10);
    out.innerHTML = `
      <div class="empty" style="padding:28px 8px 8px;text-align:left">
        <p class="empty__title">${S.searchScope === "dev"
          ? `Procure entre os ${verses.length} devocionais`
          : "Procure em toda a Bíblia"}</p>
        <p>${S.searchScope === "dev"
          ? "Por palavra, referência ou tema. Sem precisar de acento."
          : `Todas as palavras precisam aparecer no versículo. Versão ${S.version}.`}</p>
        ${S.searchScope === "dev" ? `<div class="suggest">${themes.map(t =>
          `<button class="chip" data-suggest="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}</div>` : ""}
      </div>`;
    return;
  }

  if (S.searchScope === "dev") {
    const results = verses.filter(v =>
      normalizeForSearch(v.ref).includes(q) ||
      normalizeForSearch(v.theme).includes(q) ||
      normalizeForSearch(v.ctx).includes(q));
    const words = [q];
    out.innerHTML = jump + (results.length
      ? `<p class="result-meta">${plural(results.length, "devocional", "devocionais")}</p>` +
        results.slice(0, 120).map(v => {
          const n = normalizeForSearch(v.ctx);
          return `
          <button class="result" data-dev="${escapeHtml(v.apiId)}" data-dev-theme="${escapeHtml(v.theme)}">
            <span class="result__top">
              <span class="result__ref">${highlight(v.ref, normalizeForSearch(v.ref), words)}</span>
              <span class="tag">${escapeHtml(v.theme)}</span>
            </span>
            <p class="result__text result__text--clamp">${highlight(v.ctx, n, words)}</p>
          </button>`;
        }).join("")
      : `<div class="empty"><p class="empty__title">Nada encontrado</p><p>Tente buscar na Bíblia inteira.</p>
           <div class="suggest" style="justify-content:center"><button class="chip" data-scope-switch="bible">Buscar na Bíblia inteira</button></div></div>`);
    return;
  }

  out.innerHTML = jump + `<div class="loading">Procurando…</div>`;
  try {
    const index = await getSearchIndex(S.version);
    if (token !== _searchToken) return;
    const words = q.split(/\s+/).filter(w => w.length > 1);
    if (!words.length) { out.innerHTML = jump; return; }
    const LIMIT = 150;
    const hits = [];
    let total = 0;
    for (const e of index) {
      if (words.every(w => e.n.includes(w))) {
        total++;
        if (hits.length < LIMIT) hits.push(e);
      }
    }
    out.innerHTML = jump + (total
      ? `<p class="result-meta">${plural(total, "versículo", "versículos")}${total > LIMIT ? ` · mostrando os ${LIMIT} primeiros` : ""}</p>` +
        hits.map(e => `
          <button class="result" data-open-ref="${e.b}.${e.c}.${e.v}">
            <span class="result__top"><span class="result__ref">${escapeHtml(bookName(e.b))} ${e.c}:${e.v}</span></span>
            <p class="result__text">${highlight(e.t, e.n, words)}</p>
          </button>`).join("")
      : `<div class="empty"><p class="empty__title">Nada encontrado</p><p>Confira a grafia ou use menos palavras.</p></div>`);
  } catch {
    if (token === _searchToken) out.innerHTML = jump + errorBlock("Não foi possível carregar a Bíblia para buscar.");
  }
}

/* ──────────────────────────────────────────────────────────
   FOLHA INFERIOR (preferências, compartilhar, capítulos)
   ──────────────────────────────────────────────────────────*/
let _sheetReturnFocus = null;

function openSheet(title, html) {
  _sheetReturnFocus = document.activeElement;
  $("#sheetTitle").textContent = title;
  $("#sheetBody").innerHTML = html;
  const sheet = $("#sheet");
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  setTimeout(() => $(".sheet__head [data-close]").focus({ preventScroll: true }), 60);
}

function closeSheet() {
  const sheet = $("#sheet");
  if (!sheet.classList.contains("is-open")) return;
  sheet.classList.remove("is-open");
  sheet.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  _sheetReturnFocus?.focus?.({ preventScroll: true });
}

/* ──────────────────────────────────────────────────────────
   ARRASTAR A FOLHA PARA BAIXO PARA FECHAR (igual ao Tom Louvores)
   A folha acompanha o dedo para baixo. Soltou depois de um quarto
   da altura, ou com um puxão rápido, fecha; senão volta.
   O arrasto só começa quando o conteúdo está no topo: com a lista
   rolada, puxar para baixo é rolar de volta, não fechar. Pela pega
   e pelo título ele vale sempre. No desktop a folha é uma janela
   no meio da tela e não arrasta.
   ──────────────────────────────────────────────────────────*/
(function sheetDrag() {
  let panel = null, y0 = 0, x0 = 0, t0 = 0, dy = 0, decided = false;
  const desktop = matchMedia("(min-width: 900px)");

  document.addEventListener("touchstart", e => {
    if (desktop.matches || !$("#sheet").classList.contains("is-open")) return;
    const p = e.target.closest?.(".sheet__panel");
    if (!p) return;
    /* Mexendo num controle de arrastar (tamanho do texto), o dedo é dele */
    if (e.target.closest('input[type="range"]')) return;
    const byTop = !!e.target.closest(".sheet__grip, .sheet__head");
    /* Escrevendo numa anotação, só arrasta pelo topo */
    if (!byTop && e.target.closest("textarea")) return;
    const body = $("#sheetBody");
    if (!byTop && body.scrollTop > 4) return;
    const t = e.touches[0];
    panel = p; y0 = t.clientY; x0 = t.clientX; t0 = Date.now();
    dy = 0; decided = false;
  }, { passive: true });

  document.addEventListener("touchmove", e => {
    if (!panel) return;
    const t = e.touches[0];
    const my = t.clientY - y0, mx = t.clientX - x0;
    if (!decided) {
      if (Math.abs(my) < 8 && Math.abs(mx) < 8) return;
      /* Para cima ou de lado: é rolagem ou outro gesto, não fechar */
      if (my <= 0 || Math.abs(mx) > Math.abs(my)) { panel = null; return; }
      decided = true;
    }
    dy = Math.max(0, my);
    panel.style.transition = "none";
    panel.style.transform = `translateY(${dy}px)`;
    const bd = $(".sheet__backdrop");
    bd.style.transition = "none";
    bd.style.opacity = String(Math.max(0, 1 - dy / panel.offsetHeight));
    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  const release = () => {
    if (!panel) return;
    const p = panel; panel = null;
    if (!decided) return;
    const bd = $(".sheet__backdrop");
    const quick = dy > 50 && Date.now() - t0 < 300;
    const close = dy > p.offsetHeight / 4 || quick;
    p.style.transition = "";
    bd.style.transition = ""; bd.style.opacity = "";
    if (!close) { p.style.transform = ""; return; }     // volta ao lugar
    /* Fecha a partir de onde o dedo largou, sem pular de volta ao topo */
    p.style.transform = "translateY(105%)";
    closeSheet();
    setTimeout(() => { p.style.transform = ""; }, 400);
  };
  document.addEventListener("touchend", release, { passive: true });
  document.addEventListener("touchcancel", release, { passive: true });
})();

function versionOptions() {
  return `<div class="option-list">${BIBLE_VERSIONS.map(v => `
    <button class="option ${v.id === S.version ? "is-on" : ""}" data-version="${v.id}">
      <span class="option__txt"><strong>${v.id}</strong><small>${v.name}</small></span>
      <span class="option__radio"></span>
    </button>`).join("")}</div>`;
}

function openVersionSheet() {
  openSheet("Versão da Bíblia", versionOptions());
}

function openSettings() {
  const mode  = getMode();
  const scale = parseInt(store.getRaw(KEYS.scale, "3")) || 3;
  openSheet("Preferências", `
    <div class="field">
      <span class="field__label">Aparência</span>
      <div class="segmented" role="tablist">
        ${[["system", "Automático"], ["light", "Claro"], ["dark", "Escuro"]].map(([k, l]) =>
          `<button class="${mode === k ? "is-on" : ""}" data-mode="${k}">${l}</button>`).join("")}
      </div>
    </div>
    <div class="field">
      <span class="field__label">Tamanho do texto · <span id="scaleLabel">${READING_SCALES[scale - 1].label}</span></span>
      <div class="range-row">
        <span class="a-sm">A</span>
        <input type="range" min="1" max="5" step="1" value="${scale}" id="scaleInput" aria-label="Tamanho do texto" />
        <span class="a-lg">A</span>
      </div>
      <p class="preview">O Senhor é o meu pastor; nada me faltará.</p>
    </div>
    <div class="field">
      <span class="field__label">Versão da Bíblia</span>
      ${versionOptions()}
    </div>
    ${TTS.supported ? `
    <div class="field">
      <span class="field__label">Velocidade da leitura em voz alta</span>
      <div class="segmented" role="tablist">
        ${TTS_RATES.map(r => `<button class="${r === TTS.rate ? "is-on" : ""}" data-rate="${r}">${String(r).replace(".", ",")}x</button>`).join("")}
      </div>
    </div>` : ""}
    <div class="field">
      <span class="field__label">Backup</span>
      <div class="btn-row">
        <button class="btn" data-export>${icon("download", 16)} Exportar</button>
        <button class="btn" data-import>${icon("upload", 16)} Importar</button>
      </div>
      <p class="foot-note">Guarda salvos, anotações, planos e sequência num arquivo, para levar a outro aparelho.</p>
    </div>
  `);
  $("#scaleInput").addEventListener("input", e => setReadingScale(e.target.value));
}

function openTextSizeSheet() {
  const scale = parseInt(store.getRaw(KEYS.scale, "3")) || 3;
  openSheet("Tamanho do texto", `
    <div class="field">
      <span class="field__label"><span id="scaleLabel">${READING_SCALES[scale - 1].label}</span></span>
      <div class="range-row">
        <span class="a-sm">A</span>
        <input type="range" min="1" max="5" step="1" value="${scale}" id="scaleInput" aria-label="Tamanho do texto" />
        <span class="a-lg">A</span>
      </div>
    </div>`);
  $("#scaleInput").addEventListener("input", e => setReadingScale(e.target.value));
}

function setVersion(id) {
  if (id === S.version) { closeSheet(); return; }
  S.version = id;
  store.setRaw(KEYS.version, id);
  $("#versionLabel").textContent = id;
  $$("[data-version]").forEach(b => b.classList.toggle("is-on", b.dataset.version === id));
  showVerse();
  if (S.view === "biblia" && S.reader.screen === "read") renderReader();
  if (S.view === "salvos") renderSaved();
  if (S.view === "busca") renderSearch();
  toast(`Versão ${id}`);
  if (["Versão da Bíblia", "Comparar versões"].includes($("#sheetTitle").textContent)) closeSheet();
}

/* ── Compartilhar ── */
async function shareToday() {
  const { item, items } = await currentPassageText();
  openShareSheet(items, item.ref);
}

let _shareData = null;

function openShareSheet(items, ref) {
  const text = formatPassage(items, `${ref} (${S.version})`);
  _shareData = { items, ref, text };
  openSheet("Compartilhar", `
    <canvas id="shareCanvas" class="share-preview" width="1080" height="1350" aria-label="Prévia da imagem"></canvas>
    <div class="btn-row btn-row--3">
      <button class="btn" data-share-copy>${icon("copy", 16)} Copiar</button>
      <button class="btn" data-share-text>${icon("text", 16)} Texto</button>
      <button class="btn btn--primary" data-share-image>${icon("image", 16)} Imagem</button>
    </div>`);
  drawShareImage($("#shareCanvas"), items, ref);
}

async function shareTextNow() {
  const { text } = _shareData;
  if (navigator.share) {
    try { await navigator.share({ text }); return; } catch (e) { if (e.name === "AbortError") return; }
  }
  copyText(text, "Texto copiado para compartilhar");
}

async function shareImageNow() {
  const canvas = $("#shareCanvas");
  const blob = await new Promise(res => canvas.toBlob(res, "image/png"));
  const name = `${_shareData.ref.replace(/[^\p{L}\d]+/gu, "-")}.png`;
  const file = new File([blob], name, { type: "image/png" });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], text: _shareData.ref }); return; }
    catch (e) { if (e.name === "AbortError") return; }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Imagem baixada");
}

/* Imagem 4:5, boa para stories e WhatsApp */
async function drawShareImage(canvas, items, ref) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const dark = document.documentElement.dataset.theme === "dark";
  const css  = getComputedStyle(document.documentElement);
  const c = n => css.getPropertyValue(n).trim();

  try {
    await Promise.all([
      document.fonts.load('400 64px "Newsreader"'),
      document.fonts.load('600 32px "Instrument Sans"'),
    ]);
  } catch {}

  ctx.fillStyle = c("--bg");
  ctx.fillRect(0, 0, W, H);

  /* Sol nascendo no rodapé, a mesma marca do app */
  const g = ctx.createRadialGradient(W / 2, H + 160, 40, W / 2, H + 160, 760);
  g.addColorStop(0, dark ? "rgba(227,156,116,.35)" : "rgba(155,74,44,.22)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = c("--accent-soft");
  ctx.font = '400 420px "Newsreader", Georgia, serif';
  ctx.textBaseline = "top";
  ctx.fillText("“", 70, 10);

  const body = capitalizeFirst(items.map(i => i.text).join(" "));
  const PAD = 110, maxW = W - PAD * 2;
  let size = 64, lines;
  const wrap = (s) => {
    ctx.font = `400 ${s}px "Newsreader", Georgia, serif`;
    const words = body.split(/\s+/), out = [];
    let line = "";
    words.forEach(w => {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > maxW && line) { out.push(line); line = w; }
      else line = test;
    });
    if (line) out.push(line);
    return out;
  };
  /* Diminui a fonte até caber */
  do { lines = wrap(size); size -= 4; } while (lines.length * size * 1.42 > H - 520 && size > 30);
  size += 4;
  const lh = size * 1.42;
  const blockH = lines.length * lh;
  let y = Math.max(300, (H - blockH) / 2 - 40);

  ctx.fillStyle = c("--ink");
  ctx.textBaseline = "alphabetic";
  lines.forEach(l => { ctx.fillText(l, PAD, y + size); y += lh; });

  ctx.fillStyle = c("--accent");
  ctx.fillRect(PAD, y + 50, 64, 4);
  ctx.font = '600 46px "Instrument Sans", system-ui, sans-serif';
  ctx.fillText(ref, PAD, y + 124);
  ctx.fillStyle = c("--ink-3");
  ctx.font = '500 32px "Instrument Sans", system-ui, sans-serif';
  ctx.fillText(S.version, PAD, y + 176);

  ctx.fillStyle = c("--ink-3");
  ctx.font = '400 italic 34px "Newsreader", Georgia, serif';
  ctx.textAlign = "center";
  ctx.fillText("Devocional", W / 2, H - 80);
  ctx.textAlign = "left";
}

/* ──────────────────────────────────────────────────────────
   ANOTAÇÕES
   { [apiId]: { ref, text, updatedAt } } — a chave é a passagem,
   então a anotação feita no devocional aparece também no leitor.
   ──────────────────────────────────────────────────────────*/
const getNotes = () => store.get(KEYS.notes, {});

function setNote(apiId, ref, text) {
  const notes = getNotes();
  const t = (text || "").trim();
  if (t) notes[apiId] = { ref, text: t, updatedAt: Date.now() };
  else delete notes[apiId];
  store.set(KEYS.notes, notes);
  return !!t;
}

const formatDay = ts => new Date(ts).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" });

/* ── Campo do Hoje: salva sozinho enquanto você escreve ── */
let _noteTimer = null;
let _notePending = null;

function autoGrow(el) {
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight + 2}px`;
}

function loadTodayNote(item) {
  if (!item) return;
  const input = $("#noteInput");
  const note  = getNotes()[item.apiId];
  input.value = note?.text || "";
  $("#noteStatus").textContent = note ? `Editada em ${formatDay(note.updatedAt)}` : "";
  autoGrow(input);
}

function onTodayNoteInput(e) {
  const item = S.pool[S.idx];
  if (!item) return;
  autoGrow(e.target);
  _notePending = { apiId: item.apiId, ref: item.ref, text: e.target.value };
  $("#noteStatus").textContent = "…";
  clearTimeout(_noteTimer);
  _noteTimer = setTimeout(flushNote, 600);
}

function flushNote() {
  clearTimeout(_noteTimer);
  if (!_notePending) return;
  const { apiId, ref, text } = _notePending;
  _notePending = null;
  const saved = setNote(apiId, ref, text);
  if (S.pool[S.idx]?.apiId === apiId) $("#noteStatus").textContent = saved ? "Salva" : "";
}

/* ── Editor em folha (leitor e lista de anotações) ── */
let _noteEditing = null;

function openNoteEditor(apiId, ref, quote) {
  _noteEditing = { apiId, ref };
  const note = getNotes()[apiId];
  openSheet("Anotação", `
    <p class="note-ref">${escapeHtml(ref)}</p>
    ${quote ? `<blockquote class="note-quote">${escapeHtml(capitalizeFirst(quote))}</blockquote>` : ""}
    <textarea id="noteEditor" class="note-input note-input--sheet" rows="5"
      placeholder="Escreva o que você aprendeu, uma oração ou uma pergunta…">${escapeHtml(note?.text || "")}</textarea>
    ${note ? `<p class="foot-note" style="margin:0 0 12px">Editada em ${formatDay(note.updatedAt)}</p>` : ""}
    <div class="btn-row">
      ${note
        ? `<button class="btn" data-note-delete="${escapeHtml(apiId)}">${icon("trash", 16)} Excluir</button>`
        : `<button class="btn" data-close>Cancelar</button>`}
      <button class="btn btn--primary" data-note-save>${icon("check", 16)} Salvar</button>
    </div>`);
  const ta = $("#noteEditor");
  autoGrow(ta);
  ta.addEventListener("input", () => autoGrow(ta));
  setTimeout(() => { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }, 120);
}

function afterNotesChanged() {
  decorateReader();
  loadTodayNote(S.pool[S.idx]);
  if (S.view === "salvos") renderSaved();
}

function saveNoteEditor() {
  if (!_noteEditing) return;
  const saved = setNote(_noteEditing.apiId, _noteEditing.ref, $("#noteEditor").value);
  closeSheet();
  clearSelection();
  toast(saved ? "Anotação salva" : "Anotação removida");
  afterNotesChanged();
}

function deleteNote(apiId) {
  if (!confirm("Excluir esta anotação?")) return;
  setNote(apiId, "", "");
  closeSheet();
  toast("Anotação excluída");
  afterNotesChanged();
}

/* Texto da passagem dentro do capítulo aberto, se couber nele */
function chapterQuote(apiId) {
  const p = parseApiId(apiId);
  const { book, chapter } = S.reader;
  if (p.book !== book || chapter < p.chapter || chapter > p.endChapter) return "";
  const from = p.chapter === chapter ? p.verse : 1;
  const to   = p.endChapter === chapter ? p.endVerse : _chapterVerses.length;
  return _chapterVerses.slice(from - 1, to).join(" ");
}

function openNoteFromReader(apiId) {
  const note = getNotes()[apiId];
  if (note) openNoteEditor(apiId, note.ref, chapterQuote(apiId));
}

async function editNoteFromList(apiId) {
  const note = getNotes()[apiId];
  if (!note) return;
  let quote = "";
  try { quote = (await getPassage(apiId, S.version)).map(i => i.text).join(" "); } catch {}
  openNoteEditor(apiId, note.ref, quote);
}

function openNoteTarget(apiId) {
  const p = parseApiId(apiId);
  const ids = [];
  for (let v = p.verse; v <= (p.chapter === p.endChapter ? p.endVerse : p.verse); v++) ids.push(v);
  openReader(p.book, p.chapter, { source: ids });
}

function renderNotesList(list) {
  const notes = Object.entries(getNotes()).sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0));
  if (!notes.length) {
    list.innerHTML = `
      <div class="empty">
        ${icon("pen", 44)}
        <p class="empty__title">Nenhuma anotação ainda</p>
        <p>Escreva no fim da reflexão de cada dia, ou selecione versículos na Bíblia e toque no lápis.</p>
      </div>`;
    return;
  }
  list.innerHTML = notes.map(([k, n]) => `
    <article class="saved-item">
      <div class="saved-item__top">
        <span class="saved-item__ref">${escapeHtml(n.ref)}</span>
        <span class="muted" style="font-size:.8rem">${formatDay(n.updatedAt)}</span>
      </div>
      <p class="note-text">${escapeHtml(n.text)}</p>
      <div class="saved-item__acts">
        <button class="text-btn" data-note-open="${escapeHtml(k)}">${icon("book", 14)} Abrir</button>
        <button class="text-btn" data-note-edit="${escapeHtml(k)}">${icon("pen", 14)} Editar</button>
        <button class="text-btn" data-note-delete="${escapeHtml(k)}" aria-label="Excluir anotação">${icon("trash", 14)}</button>
      </div>
    </article>`).join("");
}

/* Sublinha salvos e põe o lápis depois das passagens anotadas */
function decorateReader() {
  const reading = $("#reading");
  if (!reading) return;
  const { book, chapter } = S.reader;
  const saved = savedVersesIn(book, chapter);
  $$(".rv", reading).forEach(el => el.classList.toggle("is-saved", saved.has(+el.dataset.v)));
  $$(".rv__note", reading).forEach(el => el.remove());
  Object.keys(getNotes()).forEach(k => {
    const p = parseApiId(k);
    if (p.book !== book || chapter < p.chapter || chapter > p.endChapter) return;
    const last = p.endChapter === chapter ? p.endVerse : _chapterVerses.length;
    $(`#v${last}`, reading)?.insertAdjacentHTML("afterend",
      `<button class="rv__note" data-note-key="${escapeHtml(k)}" aria-label="Ver anotação">${icon("pen", 12)}</button>`);
  });
}

/* ──────────────────────────────────────────────────────────
   PLANOS DE LEITURA
   Os capítulos do plano são divididos por igual entre os dias.
   O progresso fica por capítulo: { [planId]: { started, done: {i: 1} } }.
   O ritmo é seu: o "dia atual" é o primeiro que ainda tem leitura.
   ──────────────────────────────────────────────────────────*/
const CHAPTER_COUNTS = [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,
                        28,16,24,21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22];
const chapterCount = id => CHAPTER_COUNTS[BOOK_ORDER.indexOf(id)] || 0;

const PLANS = [
  { id: "biblia-1-ano",   days: 365, title: "Bíblia em 1 ano",
    desc: "De Gênesis a Apocalipse, uns 3 capítulos por dia.", books: BOOK_ORDER },
  { id: "nt-90",          days: 90,  title: "Novo Testamento em 90 dias",
    desc: "De Mateus a Apocalipse: a vida de Jesus e da igreja.", books: BOOK_ORDER.slice(OT_COUNT) },
  { id: "evangelhos-30",  days: 30,  title: "Os Evangelhos em 30 dias",
    desc: "Mateus, Marcos, Lucas e João — a vida de Jesus.", books: ["MAT", "MRK", "LUK", "JHN"] },
  { id: "paulo-30",       days: 30,  title: "Cartas de Paulo em 30 dias",
    desc: "De Romanos a Filemom, a fé explicada às igrejas.", books: BOOK_ORDER.slice(44, 57) },
  { id: "salmos-30",      days: 30,  title: "Salmos em 30 dias",
    desc: "Cinco salmos por dia para orar, chorar e louvar.", books: ["PSA"] },
  { id: "proverbios-31",  days: 31,  title: "Provérbios em 31 dias",
    desc: "Um capítulo de sabedoria para cada dia do mês.", books: ["PRO"] },
];

const _planCache = {};
function planDays(plan) {
  if (_planCache[plan.id]) return _planCache[plan.id];
  const flat = [];
  plan.books.forEach(b => {
    for (let c = 1; c <= chapterCount(b); c++) flat.push({ book: b, chapter: c, i: flat.length });
  });
  const days = Array.from({ length: plan.days }, (_, d) =>
    flat.slice(Math.floor(d * flat.length / plan.days), Math.floor((d + 1) * flat.length / plan.days)));
  return (_planCache[plan.id] = { flat, days });
}

const getPlanState  = () => store.get(KEYS.plans, {});
const savePlanState = st => store.set(KEYS.plans, st);
const planById      = id => PLANS.find(p => p.id === id);

function daysBetween(a, b) {
  const [y1, m1, d1] = a.split("-").map(Number);
  const [y2, m2, d2] = b.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

function planProgress(plan) {
  const st = getPlanState()[plan.id];
  if (!st) return null;
  const { flat, days } = planDays(plan);
  const done = st.done || {};
  const doneCount = flat.filter(x => done[x.i]).length;
  let current = days.findIndex(day => day.some(x => !done[x.i]));
  const finished = current === -1;
  if (finished) current = days.length - 1;
  /* Em que dia o plano estaria se seguisse o calendário à risca */
  const expected = Math.min(days.length - 1, Math.max(0, daysBetween(st.started, dateKey())));
  return {
    done, doneCount, days, current, finished,
    total: flat.length,
    pct: Math.floor(doneCount / flat.length * 100),
    behind: finished ? 0 : Math.max(0, expected - current),
  };
}

/* "Gênesis 1–3 · Êxodo 1" */
function dayLabel(day) {
  const groups = [];
  day.forEach(x => {
    const g = groups[groups.length - 1];
    if (g && g.book === x.book && g.to === x.chapter - 1) g.to = x.chapter;
    else groups.push({ book: x.book, from: x.chapter, to: x.chapter });
  });
  return groups.map(g => `${bookName(g.book)} ${g.from}${g.to !== g.from ? "–" + g.to : ""}`).join(" · ");
}

/* Planos em andamento, o mais usado por último primeiro */
function activePlans() {
  const st = getPlanState();
  return PLANS.filter(p => st[p.id]).sort((a, b) => (st[b.id].touched || 0) - (st[a.id].touched || 0));
}

const progressBar = pct => `<span class="bar"><i style="width:${pct}%"></i></span>`;

function openPlans() {
  S.reader.screen = "plans";
  if (S.view !== "biblia") goView("biblia");
  renderPlans();
}

function openPlanDetail(id) {
  S.reader.screen = "plan";
  S.reader.planId = id;
  if (S.view !== "biblia") goView("biblia");
  renderPlan(id);
}

function startPlan(id) {
  const st = getPlanState();
  st[id] = { started: dateKey(), done: {}, touched: Date.now() };
  savePlanState(st);
  toast("Plano iniciado. Bom começo!");
  renderPlan(id);
  renderPlanToday();
}

function stopPlan(id) {
  if (!confirm("Parar este plano? O progresso dele será apagado.")) return;
  const st = getPlanState();
  delete st[id];
  savePlanState(st);
  toast("Plano encerrado");
  renderPlan(id);
  renderPlanToday();
}

/* Abre a próxima leitura pendente do dia (ou do dia atual) */
function openPlanReading(id, dayIdx) {
  const plan = planById(id);
  const pr   = plan && planProgress(plan);
  if (!pr) return openPlanDetail(id);
  const day  = pr.days[dayIdx ?? pr.current];
  const next = day.find(x => !pr.done[x.i]) || day[0];
  const st = getPlanState();
  st[id].touched = Date.now();
  savePlanState(st);
  S.reader.planId = id;
  openReader(next.book, next.chapter);
}

function markReadToday() {
  const days = getReadDays();
  days.add(dateKey());
  store.set(KEYS.readDays, [...days].sort().slice(-400));
  renderStreak();
}

function markPlanChapter(id, i) {
  const st = getPlanState();
  if (!st[id]) return;
  st[id].done = { ...(st[id].done || {}), [i]: 1 };
  st[id].touched = Date.now();
  savePlanState(st);

  const plan = planById(id);
  const { days } = planDays(plan);
  const dayIdx = days.findIndex(d => d.some(x => x.i === i));
  const remaining = days[dayIdx].filter(x => !st[id].done[x.i]);
  renderPlanToday();

  if (remaining.length) {
    toast(`Lido · ${plural(remaining.length, "capítulo falta", "capítulos faltam")} hoje`);
    S.reader.planId = id;
    return openReader(remaining[0].book, remaining[0].chapter);
  }

  /* Dia completo: conta para a sequência */
  markReadToday();
  const pr = planProgress(plan);
  toast(pr.finished ? "Plano concluído! Glória a Deus." : `Dia ${dayIdx + 1} concluído!`);
  $("#planFoot").innerHTML = `
    <div class="plan-foot plan-foot--done">
      <span class="plan-foot__badge">${icon("check", 18)}</span>
      <div class="plan-foot__txt">
        <small>${escapeHtml(plan.title)}</small>
        <span>${pr.finished ? "Plano concluído!" : `Dia ${dayIdx + 1} concluído`}</span>
      </div>
      <button class="btn" data-plan-open="${id}">Ver plano</button>
    </div>`;
  $("#planChip").innerHTML = "";
}

/* Leitor: se o capítulo faz parte do dia atual de algum plano */
function renderPlanReader() {
  const { book, chapter } = S.reader;
  const matches = activePlans().map(plan => {
    const pr = planProgress(plan);
    if (pr.finished) return null;
    const day  = pr.days[pr.current];
    const item = day.find(x => x.book === book && x.chapter === chapter);
    return item ? { plan, pr, day, item } : null;
  }).filter(Boolean);
  /* Prefere o plano pelo qual a leitura foi aberta */
  matches.sort((a, b) => (b.plan.id === S.reader.planId) - (a.plan.id === S.reader.planId));
  const m = matches[0];
  if (!m) { $("#planChip").innerHTML = $("#planFoot").innerHTML = ""; return; }

  const read = m.day.filter(x => m.pr.done[x.i]).length;
  $("#planChip").innerHTML = `
    <button class="plan-chip" data-plan-open="${m.plan.id}">
      ${icon("calendar", 14)} ${escapeHtml(m.plan.title)} · Dia ${m.pr.current + 1} · ${read}/${m.day.length}
    </button>`;
  const isDone = !!m.pr.done[m.item.i];
  const nextUnread = m.day.find(x => !m.pr.done[x.i]);
  $("#planFoot").innerHTML = `
    <div class="plan-foot">
      <div class="plan-foot__txt">
        <small>${escapeHtml(m.plan.title)} · Dia ${m.pr.current + 1}</small>
        <span>${escapeHtml(dayLabel(m.day))}</span>
      </div>
      ${isDone
        ? (nextUnread ? `<button class="btn btn--primary" data-plan-read="${m.plan.id}">Próximo: ${escapeHtml(bookName(nextUnread.book))} ${nextUnread.chapter}</button>` : "")
        : `<button class="btn btn--primary" data-plan-mark="${m.plan.id}:${m.item.i}">${icon("check", 16)} Marcar como lido</button>`}
    </div>`;
}

/* Cartão de planos no início da Bíblia */
function plansHomeHtml() {
  const plans = activePlans().slice(0, 2);
  const cards = plans.map(plan => {
    const pr = planProgress(plan);
    return `
      <div class="plan-card">
        <button class="plan-card__top" data-plan-open="${plan.id}">
          <strong>${escapeHtml(plan.title)}</strong>
          <span>${pr.finished ? "Concluído" : `Dia ${pr.current + 1} de ${plan.days}`} ${icon("chev-r", 14)}</span>
        </button>
        ${progressBar(pr.pct)}
        ${pr.finished ? "" : `
          <div class="plan-card__row">
            <span class="plan-card__today">${escapeHtml(dayLabel(pr.days[pr.current]))}</span>
            <button class="btn btn--primary btn--sm" data-plan-read="${plan.id}">Ler</button>
          </div>`}
      </div>`;
  }).join("");
  return `
    <section class="plans-home">
      <div class="testament__head">
        <h2 class="section-label">Planos de leitura</h2>
        <button class="text-btn text-btn--accent" data-plans>Ver todos</button>
      </div>
      ${cards || `
        <button class="plan-cta" data-plans>
          <span class="plan-cta__icon">${icon("calendar", 20)}</span>
          <span class="plan-cta__txt"><strong>Comece um plano de leitura</strong>
            <small>Bíblia em 1 ano, Salmos em 30 dias e outros</small></span>
          ${icon("chev-r", 18)}
        </button>`}
    </section>`;
}

/* Cartão no Hoje: a leitura do plano do dia */
function renderPlanToday() {
  const el = $("#planToday");
  if (!el) return;
  const plan = activePlans().find(p => !planProgress(p).finished);
  if (!plan) {
    el.hidden = false;
    el.innerHTML = `
      <button class="plan-cta plan-cta--ghost" data-plans>
        <span class="plan-cta__icon">${icon("calendar", 20)}</span>
        <span class="plan-cta__txt"><strong>Quer ir além do versículo?</strong>
          <small>Escolha um plano para ler a Bíblia todo dia</small></span>
        ${icon("chev-r", 18)}
      </button>`;
    return;
  }
  const pr = planProgress(plan);
  const day = pr.days[pr.current];
  const read = day.filter(x => pr.done[x.i]).length;
  el.hidden = false;
  el.innerHTML = `
    <h2 class="section-label">Plano de leitura</h2>
    <div class="plan-card plan-card--today">
      <button class="plan-card__top" data-plan-open="${plan.id}">
        <strong>${escapeHtml(plan.title)}</strong>
        <span>Dia ${pr.current + 1} de ${plan.days} ${icon("chev-r", 14)}</span>
      </button>
      ${progressBar(pr.pct)}
      <div class="plan-card__row">
        <span class="plan-card__today">${escapeHtml(dayLabel(day))}${read ? ` <em>· ${read}/${day.length} lidos</em>` : ""}</span>
        <button class="btn btn--primary btn--sm" data-plan-read="${plan.id}">${read ? "Continuar" : "Ler"}</button>
      </div>
      ${pr.behind > 1 ? `<p class="plan-card__note">Você está ${pr.behind} dias atrás do calendário. Tudo bem: siga no seu ritmo.</p>` : ""}
    </div>`;
}

function renderPlans() {
  S.reader.screen = "plans";
  clearSelection();
  const st = getPlanState();
  $("#bibleBody").innerHTML = `
    <div class="back-row">
      <button class="text-btn" data-books>${icon("chev-l", 14)} Bíblia</button>
    </div>
    <h1 class="display">Planos de leitura</h1>
    <p class="muted" style="margin-top:6px">Escolha um ritmo. Dá para ter mais de um plano ao mesmo tempo.</p>
    <div class="plan-list">
      ${PLANS.map(plan => {
        const pr = st[plan.id] ? planProgress(plan) : null;
        const per = (planDays(plan).flat.length / plan.days);
        return `
          <button class="plan-item" data-plan-open="${plan.id}">
            <span class="plan-item__days"><b>${plan.days}</b><small>dias</small></span>
            <span class="plan-item__txt">
              <strong>${escapeHtml(plan.title)}</strong>
              <small>${escapeHtml(plan.desc)}</small>
              ${pr
                ? `${progressBar(pr.pct)}<small class="plan-item__status">${pr.finished ? "Concluído" : `Dia ${pr.current + 1} · ${pr.pct}%`}</small>`
                : `<small class="plan-item__status">${per < 1.5 ? "1 capítulo" : `~${Math.round(per)} capítulos`} por dia</small>`}
            </span>
            ${icon("chev-r", 18)}
          </button>`;
      }).join("")}
    </div>`;
  window.scrollTo(0, 0);
}

function renderPlan(id) {
  const plan = planById(id);
  if (!plan) return renderPlans();
  S.reader.screen = "plan";
  S.reader.planId = id;
  clearSelection();
  const pr = planProgress(plan);
  const { flat, days } = planDays(plan);

  const dayRow = (day, d) => {
    const done = pr && day.every(x => pr.done[x.i]);
    const cur  = pr && !pr.finished && d === pr.current;
    return `
      <button class="day-row ${done ? "is-done" : ""} ${cur ? "is-current" : ""}" ${pr ? `data-plan-day="${id}:${d}"` : "disabled"}>
        <span class="day-row__box">${done ? icon("check", 13) : ""}</span>
        <span class="day-row__n">Dia ${d + 1}</span>
        <span class="day-row__label">${escapeHtml(dayLabel(day))}</span>
      </button>`;
  };

  $("#bibleBody").innerHTML = `
    <div class="back-row">
      <button class="text-btn" data-plans>${icon("chev-l", 14)} Planos</button>
    </div>
    <h1 class="display">${escapeHtml(plan.title)}</h1>
    <p class="muted" style="margin-top:6px">${escapeHtml(plan.desc)} ${plural(flat.length, "capítulo", "capítulos")} em ${plan.days} dias.</p>

    ${pr ? `
      <div class="plan-hero">
        <div class="plan-hero__nums">
          <span class="plan-hero__pct">${pr.pct}<small>%</small></span>
          <span class="muted">${pr.doneCount} de ${pr.total} capítulos<br>${pr.finished ? "Plano concluído" : `Dia ${pr.current + 1} de ${plan.days}`}</span>
        </div>
        ${progressBar(pr.pct)}
        ${pr.behind > 1 ? `<p class="plan-card__note">Você está ${pr.behind} dias atrás do calendário. Tudo bem: siga no seu ritmo.</p>` : ""}
        ${pr.finished ? "" : `<button class="btn btn--primary btn--block" data-plan-read="${id}">${icon("book", 16)} Ler o dia ${pr.current + 1}: ${escapeHtml(dayLabel(days[pr.current]))}</button>`}
      </div>` : `
      <button class="btn btn--primary btn--block" style="margin:18px 0 4px" data-plan-start="${id}">${icon("calendar", 16)} Começar hoje</button>`}

    <h2 class="section-label" style="margin-top:26px">${pr ? "Todos os dias" : "Como fica"}</h2>
    <div class="day-list">
      ${(pr ? days : days.slice(0, 7)).map(dayRow).join("")}
      ${pr ? "" : `<p class="muted" style="padding:8px 4px">…e assim até o dia ${plan.days}.</p>`}
    </div>
    ${pr ? `<button class="text-btn" style="margin-top:16px;color:var(--ink-3)" data-plan-stop="${id}">${icon("trash", 14)} Parar este plano</button>` : ""}`;

  window.scrollTo(0, 0);
  if (pr && !pr.finished) {
    requestAnimationFrame(() => {
      const cur = $(".day-row.is-current");
      if (cur && pr.current > 3) {
        const top = cur.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2;
        window.scrollTo({ top: Math.max(0, top) });
      }
    });
  }
}

/* ──────────────────────────────────────────────────────────
   COMPARAR VERSÕES
   loader(versionId) → Promise<[{ n, text }]>
   ──────────────────────────────────────────────────────────*/
let _compare = null;

function openCompare(ref, loader) {
  _compare = { ref, texts: {} };
  openSheet("Comparar versões", `
    <p class="note-ref">${escapeHtml(ref)}</p>
    <div class="compare">
      ${BIBLE_VERSIONS.map(v => `
        <section class="compare__item ${v.id === S.version ? "is-current" : ""}" data-cmp="${v.id}">
          <div class="compare__head"><strong>${v.id}</strong><small>${v.name}</small></div>
          <p class="compare__text"><span class="skeleton"></span><span class="skeleton skeleton--short"></span></p>
          <div class="compare__acts"></div>
        </section>`).join("")}
    </div>`);
  const mine = _compare;
  BIBLE_VERSIONS.forEach(async v => {
    const el = $(`[data-cmp="${v.id}"]`);
    try {
      const items = await loader(v.id);
      if (_compare !== mine || !el.isConnected) return;
      mine.texts[v.id] = items;
      el.querySelector(".compare__text").innerHTML = items.length > 1
        ? items.map(i => `<sup>${i.n}</sup>${escapeHtml(i.text)}`).join(" ")
        : escapeHtml(capitalizeFirst(items[0]?.text || ""));
      el.querySelector(".compare__acts").innerHTML = `
        <button class="text-btn" data-cmp-copy="${v.id}">${icon("copy", 14)} Copiar</button>
        ${v.id === S.version
          ? `<span class="tag tag--muted">Versão atual</span>`
          : `<button class="text-btn text-btn--accent" data-version="${v.id}">Usar ${v.id}</button>`}`;
    } catch {
      if (el.isConnected) el.querySelector(".compare__text").textContent = "Não foi possível carregar esta versão. Verifique sua conexão.";
    }
  });
}

function copyCompare(versionId) {
  const items = _compare?.texts[versionId];
  if (items) copyText(formatPassage(items, `${_compare.ref} (${versionId})`), `${versionId} copiada`);
}

/* ──────────────────────────────────────────────────────────
   LEITURA EM VOZ ALTA (voz do próprio aparelho)
   Cada versículo/frase vira uma fala separada: o Chrome corta
   falas longas, e assim dá para destacar o versículo atual.
   Pausar cancela e lembra onde parou — o pause() nativo trava
   em vários Androids.
   ──────────────────────────────────────────────────────────*/
const TTS_RATES = [0.8, 1, 1.25, 1.5];
const TTS = {
  supported: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
  queue: [], i: 0, gen: 0, kind: null, paused: false, onEnd: null,
  rate: TTS_RATES.includes(+store.getRaw(KEYS.ttsRate, "1")) ? +store.getRaw(KEYS.ttsRate, "1") : 1,
};

function ttsVoice() {
  const vs = speechSynthesis.getVoices();
  return vs.find(v => v.lang === "pt-BR" || v.lang === "pt_BR") || vs.find(v => /^pt/i.test(v.lang));
}

/* Quebra textos longos em frases, sem perder o callback do início */
function splitForSpeech(seg) {
  if (seg.text.length < 220) return [seg];
  const parts = seg.text.match(/[^.!?;:…]+[.!?;:…]*\s*/g) || [seg.text];
  return parts.filter(p => p.trim()).map((text, k) => ({ text, onStart: k === 0 ? seg.onStart : null }));
}

/* "Romanos 8:38-39" → "Romanos 8, versículos 38 a 39" */
function speakableRef(ref) {
  return ref.replace(/(\d+):(\d+)(?:-(\d+))?/, (_, c, a, b) =>
    b ? `${c}, versículos ${a} a ${b}` : `${c}, versículo ${a}`);
}

function ttsStart(segments, label, { kind = null, onEnd = null } = {}) {
  if (!TTS.supported) return;
  ttsStop();
  TTS.queue  = segments.flatMap(splitForSpeech);
  TTS.i      = 0;
  TTS.kind   = kind;
  TTS.onEnd  = onEnd;
  TTS.paused = false;
  $("#ttsLabel").textContent = label;
  document.body.classList.add("tts-on");
  updateTtsBar();
  ttsSpeakNext();
}

function ttsSpeakNext() {
  if (!TTS.kind || TTS.paused) return;
  if (TTS.i >= TTS.queue.length) {
    const cb = TTS.onEnd;
    ttsStop();
    cb?.();
    return;
  }
  const gen = TTS.gen;
  const seg = TTS.queue[TTS.i];
  const u = new SpeechSynthesisUtterance(seg.text);
  u.lang = "pt-BR";
  const voice = ttsVoice();
  if (voice) u.voice = voice;
  u.rate = TTS.rate;
  u.onstart = () => { if (gen === TTS.gen) seg.onStart?.(); };
  u.onend = () => { if (gen !== TTS.gen) return; TTS.i++; ttsSpeakNext(); };
  u.onerror = e => {
    if (gen !== TTS.gen || e.error === "interrupted" || e.error === "canceled") return;
    TTS.i++; ttsSpeakNext();
  };
  /* Falar logo depois de um cancel() às vezes é ignorado no Chrome */
  setTimeout(() => { if (gen === TTS.gen) speechSynthesis.speak(u); }, 40);
}

function ttsStop() {
  if (!TTS.supported) return;
  TTS.gen++;
  TTS.kind = null;
  TTS.paused = false;
  TTS.onEnd = null;
  speechSynthesis.cancel();
  document.body.classList.remove("tts-on");
  markSpeaking(null);
  updateTtsBar();
}

function ttsTogglePause() {
  if (!TTS.kind) return;
  if (TTS.paused) {
    TTS.paused = false;
    ttsSpeakNext();
  } else {
    TTS.paused = true;
    TTS.gen++;
    speechSynthesis.cancel();
  }
  updateTtsBar();
}

function setTtsRate(rate) {
  TTS.rate = rate;
  store.setRaw(KEYS.ttsRate, String(rate));
  $$("[data-rate]").forEach(b => b.classList.toggle("is-on", +b.dataset.rate === rate));
  updateTtsBar();
  /* Aplica já: recomeça a frase atual na nova velocidade */
  if (TTS.kind && !TTS.paused) {
    TTS.gen++;
    speechSynthesis.cancel();
    ttsSpeakNext();
  }
}

function updateTtsBar() {
  const on = !!TTS.kind;
  $("#ttsBar").classList.toggle("is-open", on);
  $("#ttsToggle").innerHTML = icon(TTS.paused ? "play" : "pause", 17);
  $("#ttsToggle").setAttribute("aria-label", TTS.paused ? "Continuar" : "Pausar");
  $("#ttsToggle").classList.toggle("is-paused", TTS.paused);
  $("#ttsRate").textContent = `${String(TTS.rate).replace(".", ",")}x`;
  const lb = $("#listenBtn");
  lb.classList.toggle("is-on", TTS.kind === "today");
  lb.querySelector("span").textContent = TTS.kind === "today" ? "Parar" : "Ouvir";
  $("[data-listen-chapter]")?.classList.toggle("is-on", TTS.kind === "chapter");
}

async function listenToday() {
  const item = S.pool[S.idx];
  if (!item) return;
  let items = [];
  try { items = await getPassage(item.apiId, S.version); } catch {}
  ttsStart([
    { text: `${speakableRef(item.ref)}.` },
    ...items.map(i => ({ text: i.text })),
    { text: "Reflexão." },
    { text: item.ctx },
  ], item.ref, { kind: "today" });
}

function markSpeaking(n) {
  $$(".rv.is-speaking").forEach(e => e.classList.remove("is-speaking"));
  if (!n) return;
  const el = $(`#v${n}`);
  if (!el) return;
  el.classList.add("is-speaking");
  const r = el.getBoundingClientRect();
  if (r.top < 120 || r.bottom > window.innerHeight - 150) {
    window.scrollTo({ top: window.scrollY + r.top - window.innerHeight / 3, behavior: "smooth" });
  }
}

/* Lê o capítulo e, no fim, segue para o próximo */
function listenChapter() {
  const { book, chapter } = S.reader;
  if (!_chapterVerses.length) return;
  ttsStart([
    { text: `${bookName(book)}, capítulo ${chapter}.` },
    ..._chapterVerses.map((text, i) => ({ text, onStart: () => markSpeaking(i + 1) })),
  ], `${bookName(book)} ${chapter}`, {
    kind: "chapter",
    onEnd: () => {
      const r = S.reader;
      if (S.view === "biblia" && r.screen === "read" && r.book === book && r.chapter === chapter && r.next) {
        readerGo(1, { autoplay: true });
      }
    },
  });
}

/* ──────────────────────────────────────────────────────────
   GESTO DE ARRASTAR (troca versículo / capítulo)
   ──────────────────────────────────────────────────────────*/
function onSwipe(el, handler) {
  let x0 = null, y0 = null, t0 = 0;
  el.addEventListener("touchstart", e => {
    if (e.touches.length !== 1) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
  }, { passive: true });
  el.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50 && Date.now() - t0 < 600) handler(dx < 0 ? 1 : -1);
  }, { passive: true });
}

/* ──────────────────────────────────────────────────────────
   EVENTOS
   Um ouvinte só, por delegação, para o HTML gerado dinamicamente.
   ──────────────────────────────────────────────────────────*/
document.addEventListener("click", e => {
  const t = e.target.closest("button, a, .rv, [data-close]");
  if (!t) return;
  const d = t.dataset;

  if (t.matches("[data-close]"))      return closeSheet();
  if (d.noteKey)                      return openNoteFromReader(d.noteKey);
  if (t.classList.contains("rv"))     return toggleVerse(+d.v, t);

  if (d.plans !== undefined)          return openPlans();
  if (d.planOpen)                     return openPlanDetail(d.planOpen);
  if (d.planStart)                    return startPlan(d.planStart);
  if (d.planStop)                     return stopPlan(d.planStop);
  if (d.planRead)                     return openPlanReading(d.planRead);
  if (d.planDay) {
    const [id, day] = d.planDay.split(":");
    return openPlanReading(id, +day);
  }
  if (d.planMark) {
    const [id, i] = d.planMark.split(":");
    return markPlanChapter(id, +i);
  }
  if (d.listenChapter !== undefined)  return TTS.kind === "chapter" ? ttsStop() : listenChapter();
  if (d.noteSave !== undefined)       return saveNoteEditor();
  if (d.noteDelete)                   return deleteNote(d.noteDelete);
  if (d.noteEdit)                     return editNoteFromList(d.noteEdit);
  if (d.noteOpen)                     return openNoteTarget(d.noteOpen);
  if (d.cmpCopy)                      return copyCompare(d.cmpCopy);
  if (d.rate)                         return setTtsRate(+d.rate);
  if (d.shareCopy !== undefined)      return copyText(_shareData.text);

  if (d.themeChip !== undefined)      return selectTheme(d.themeChip);
  if (d.dev)                          return openDevotional(d.dev, d.devTheme);

  if (d.book && t.classList.contains("book-btn")) return renderChapters(d.book);
  if (d.chapter)                      return openReader(S.reader.book, +d.chapter);
  if (d.books !== undefined)          return renderBooks();
  if (d.chapters !== undefined)       return renderChapters(S.reader.book);
  if (d.continue !== undefined) {
    const last = store.get(KEYS.lastRead, null);
    if (last) openReader(last.book, last.chapter);
    return;
  }
  if (d.readerGo)                     return readerGo(+d.readerGo);
  if (d.textSize !== undefined)       return openTextSizeSheet();
  if (d.backToday !== undefined)      { S.reader.fromToday = false; return goView("hoje"); }

  if (d.jump)                         return jumpToRef(d.jump);
  if (d.openRef) {
    const [b, c, v] = d.openRef.split(".");
    return openReader(b, +c, { source: [+v] });
  }
  if (d.suggest) {
    $("#searchInput").value = d.suggest;
    $("#searchClear").hidden = false;
    return renderSearch();
  }
  if (d.scope)                        return setSearchScope(d.scope);
  if (d.scopeSwitch)                  return setSearchScope(d.scopeSwitch);

  if (d.filter) { S.savedFilter = d.filter; return renderSaved(); }
  if (d.favOpen)                      return openFavorite(+d.favOpen);
  if (d.favCopy)                      return copyFavorite(+d.favCopy);
  if (d.favRemove)                    return removeFavorite(+d.favRemove);

  if (d.mode) {
    setMode(d.mode);
    $$("[data-mode]").forEach(b => b.classList.toggle("is-on", b.dataset.mode === d.mode));
    return;
  }
  if (d.version)                      return setVersion(d.version);
  if (d.export !== undefined)         return exportBackup();
  if (d.import !== undefined)         return $("#importInput").click();
  if (d.shareText !== undefined)      return shareTextNow();
  if (d.shareImage !== undefined)     return shareImageNow();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if ($("#sheet").classList.contains("is-open")) return closeSheet();
    if (S.sel.size) return clearSelection();
  }
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
  if (typing || $("#sheet").classList.contains("is-open") || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const dir = e.key === "ArrowRight" ? 1 : -1;
    if (S.view === "hoje") go(dir);
    else if (S.view === "biblia" && S.reader.screen === "read") readerGo(dir);
  }
  if (e.key === "/" && S.view !== "busca") { e.preventDefault(); goView("busca"); }
});

/* ──────────────────────────────────────────────────────────
   INICIALIZAÇÃO
   ──────────────────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", () => {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  applyMode();
  setReadingScale(store.getRaw(KEYS.scale, "3"), false);
  $("#versionLabel").textContent = S.version;

  renderDate();
  renderThemeChips();
  renderStreak();
  S.idx = dayIndex();
  showVerse();
  renderPlanToday();

  $("#prevBtn").addEventListener("click", () => go(-1));
  $("#nextBtn").addEventListener("click", () => go(1));
  $("#randomBtn").addEventListener("click", goRandom);
  $("#todayBtn").addEventListener("click", goToday);
  $("#favBtn").addEventListener("click", toggleFavorite);
  $("#copyBtn").addEventListener("click", copyVerse);
  $("#shareBtn").addEventListener("click", shareToday);
  $("#compareBtn").addEventListener("click", () => {
    const item = S.pool[S.idx];
    openCompare(item.ref, v => getPassage(item.apiId, v));
  });
  $("#listenBtn").hidden = !TTS.supported;
  $("#listenBtn").addEventListener("click", () => TTS.kind === "today" ? ttsStop() : listenToday());
  $("#noteInput").addEventListener("input", onTodayNoteInput);
  $("#noteInput").addEventListener("blur", flushNote);
  window.addEventListener("pagehide", flushNote);
  $("#ttsToggle").addEventListener("click", ttsTogglePause);
  $("#ttsStop").addEventListener("click", () => ttsStop());
  $("#ttsRate").addEventListener("click", () => {
    const i = TTS_RATES.indexOf(TTS.rate);
    setTtsRate(TTS_RATES[(i + 1) % TTS_RATES.length]);
  });
  $("#chapterBtn").addEventListener("click", openChapterFromToday);
  $("#doneBtn").addEventListener("click", toggleDone);
  $("#streakBtn").addEventListener("click", showStreakInfo);
  $("#settingsBtn").addEventListener("click", openSettings);
  $("#versionBtn").addEventListener("click", openVersionSheet);

  $("#selClear").addEventListener("click", clearSelection);
  $("#selFav").addEventListener("click", saveSelection);
  $("#selNote").addEventListener("click", noteSelection);
  $("#selCompare").addEventListener("click", compareSelection);
  $("#selShare").addEventListener("click", shareSelection);

  $("#searchInput").addEventListener("input", onSearchInput);
  $("#searchInput").addEventListener("keydown", e => {
    if (e.key === "Enter" && $(".jump-card")) { e.preventDefault(); $(".jump-card").click(); }
  });
  $("#searchClear").addEventListener("click", () => {
    $("#searchInput").value = "";
    $("#searchClear").hidden = true;
    renderSearch();
    $("#searchInput").focus();
  });

  $("#importInput").addEventListener("change", e => {
    const f = e.target.files?.[0];
    if (f) importBackup(f);
    e.target.value = "";
  });

  onSwipe($("#card"), go);
  onSwipe($("#bibleBody"), dir => { if (S.reader.screen === "read" && !S.sel.size) readerGo(dir); });

  /* Virou o dia com o app aberto: atualiza a data e o versículo */
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    const k = dateKey();
    if (k !== window._lastDay) {
      window._lastDay = k;
      renderDate();
      renderStreak();
      renderPlanToday();
      goToday();
    }
  });
  window._lastDay = dateKey();

  /* Atalhos do app instalado (manifest.json → shortcuts) */
  const abrir = new URLSearchParams(location.search).get("abrir");
  if (abrir === "biblia")         location.hash = "biblia";
  else if (abrir === "favoritos") location.hash = "salvos";

  showView(viewFromHash());
});
