/* ── Remove aspas tipográficas da API ── */
function capitalizeFirst(text) {
  if (!text) return text;
  const t = text.trimStart();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function stripQuotes(text) {
  return text.replace(/[“”„‟‘’]/g, "");
}

/* Normaliza para busca: sem acento, minúsculo */
function normalizeForSearch(s) {
  return (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/* ──────────────────────────────────────────────────────────
   DADOS LOCAIS DA BÍBLIA
   O JSON de cada versão é carregado de versoes/<id>.json e
   mantido em memória. Estrutura esperada:
   [{ "abbrev": "Gn", "chapters": [["v1","v2",...], ...] }, ...]
   ──────────────────────────────────────────────────────────*/
const _bibleCache = {};   // { "ARA": Promise<data[]> }

function loadBibleVersion(versionId) {
  if (!_bibleCache[versionId]) {
    _bibleCache[versionId] = fetch(`versoes/${versionId}.json`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      /* Se falhar, tira a promise rejeitada do cache — senão a versão
         fica quebrada até dar F5, mesmo depois da rede voltar. */
      .catch(err => { delete _bibleCache[versionId]; throw err; });
  }
  return _bibleCache[versionId];
}

/* Mapeamento USFM (usado nos apiId) → abreviação do JSON */
const USFM_TO_ABBREV = {
  GEN:"Gn", EXO:"Êx", LEV:"Lv", NUM:"Nm", DEU:"Dt",
  JOS:"Js", JDG:"Jz", RUT:"Rt", "1SA":"1Sm", "2SA":"2Sm",
  "1KI":"1Rs", "2KI":"2Rs", "1CH":"1Cr", "2CH":"2Cr", EZR:"Ed",
  NEH:"Ne", EST:"Et", JOB:"Jó", PSA:"Sl", PRO:"Pv",
  ECC:"Ec", SNG:"Ct", ISA:"Is", JER:"Jr", LAM:"Lm",
  EZK:"Ez", DAN:"Dn", HOS:"Os", JOL:"Jl", AMO:"Am",
  OBA:"Ob", JON:"Jn", MIC:"Mq", NAM:"Na", HAB:"Hc",
  ZEP:"Sf", HAG:"Ag", ZEC:"Zc", MAL:"Ml",
  MAT:"Mt", MRK:"Mc", LUK:"Lc", JHN:"Jo", ACT:"At",
  ROM:"Rm", "1CO":"1Co", "2CO":"2Co", GAL:"Gl",
  EPH:"Ef", PHP:"Fp", COL:"Cl", "1TH":"1Ts", "2TH":"2Ts",
  "1TI":"1Tm", "2TI":"2Tm", TIT:"Tt",
  PHM:"Fm", HEB:"Hb", JAS:"Tg", "1PE":"1Pe", "2PE":"2Pe",
  "1JN":"1Jo", "2JN":"2Jo", "3JN":"3Jo", JUD:"Jd", REV:"Ap"
};

/* Reverso: abreviação do JSON → USFM */
const ABBREV_TO_USFM = Object.fromEntries(
  Object.entries(USFM_TO_ABBREV).map(([u, a]) => [a, u])
);

/* Retorna texto de um versículo ou passagem a partir do JSON local */
async function fetchVerse(apiId, versionId) {
  const data = await loadBibleVersion(versionId);

  const readVerse = (bookId, chap, verse) => {
    const bookData = data.find(b => b.abbrev === USFM_TO_ABBREV[bookId]);
    if (!bookData) return "";
    return bookData.chapters[chap - 1]?.[verse - 1] ?? "";
  };

  /* Passagem (ex: "ROM.8.38-ROM.8.39") */
  if (apiId.includes("-")) {
    const [startId, endId] = apiId.split("-");
    const [bookA, chapA, vStart] = startId.split(".");
    const [bookB, chapB, vEnd]   = endId.split(".");

    const bookData = data.find(b => b.abbrev === USFM_TO_ABBREV[bookA]);
    if (!bookData) return "";

    const texts = [];
    /* Suporta passagem que atravessa capítulos (ex: "ROM.8.38-ROM.9.1") */
    for (let c = parseInt(chapA); c <= parseInt(chapB); c++) {
      const chapArr = bookData.chapters[c - 1] || [];
      const from = c === parseInt(chapA) ? parseInt(vStart) : 1;
      const to   = c === parseInt(chapB) ? parseInt(vEnd)   : chapArr.length;
      for (let v = from; v <= to; v++) {
        const t = chapArr[v - 1];
        if (t) texts.push(t);
      }
    }
    return texts.join(" ");
  }

  /* Versículo simples (ex: "JHN.3.16") */
  const [book, chap, verse] = apiId.split(".");
  return readVerse(book, parseInt(chap), parseInt(verse));
}


/* Versões locais disponíveis (arquivo JSON em versoes/<id>.json) */
const BIBLE_VERSIONS = [
  { id: "ARA", name: "ARA — Almeida Revista e Atualizada", lang: "pt" },
  { id: "ARC", name: "ARC — Almeida Revista e Corrigida", lang: "pt" },
  { id: "NAA", name: "NAA — Nova Almeida Atualizada", lang: "pt" },
];


// verses carregado de versiculos.js
/* ──────────────────────────────────────────────────────────
   ESTADO DA APLICAÇÃO
   ──────────────────────────────────────────────────────────*/
let currentTheme   = "Todos";
let currentVersion = "ARA";
let pool           = [...verses];
let idx            = 0;

/* Token de exibição: cada chamada de show() ganha um número.
   Só a mais recente pode escrever na tela — resolve o problema de
   clicar rápido no próximo/anterior e a tela ficar dessincronizada. */
let _showToken = 0;

/* ──────────────────────────────────────────────────────────
   INICIALIZAÇÃO
   ──────────────────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", () => {
  /* O navegador restaura a rolagem da visita anterior e o app abria
     no meio da página. Aqui ele sempre começa do topo. */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  populateThemes();
  populateVersions();
  initThemeDropdowns();
  loadDark();
  loadReadingScale();
  applyFilter(true);

  /* Atalhos do app instalado (manifest.json → shortcuts) */
  const abrir = new URLSearchParams(location.search).get("abrir");
  if (abrir === "biblia")         openBibleReader();
  else if (abrir === "favoritos") openFavoritesModal();

  document.getElementById("versionSelect").addEventListener("change", (e) => {
    currentVersion = e.target.value;
    document.getElementById("versionSelectMobile").value = e.target.value;
    show(pool[idx]);
  });

  document.getElementById("versionSelectMobile").addEventListener("change", (e) => {
    currentVersion = e.target.value;
    document.getElementById("versionSelect").value = e.target.value;
    closeHamburgerMenu();
    show(pool[idx]);
  });
});

/* ──────────────────────────────────────────────────────────
   POPULAR SELETORES
   ──────────────────────────────────────────────────────────*/
function populateThemes() {
  /* Apenas armazena os temas — o dropdown é montado em initThemeDropdowns */
  window._allThemes = ["Todos", ...new Set(verses.map(v => v.theme))];
}

function populateVersions() {
  const sel       = document.getElementById("versionSelect");
  const selMobile = document.getElementById("versionSelectMobile");
  BIBLE_VERSIONS.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.id; opt.textContent = v.name;
    sel.appendChild(opt);
    selMobile.appendChild(opt.cloneNode(true));
  });
}

/* ──────────────────────────────────────────────────────────
   DROPDOWN CUSTOMIZADO DE TEMAS
   ──────────────────────────────────────────────────────────*/
function buildDropdownPanel(panelEl, isMobile) {
  panelEl.innerHTML = "";
  const themes = window._allThemes || [];

  /* ── "Todos os Temas" em linha única no topo ── */
  const allRow = document.createElement("div");
  allRow.className = "custom-dropdown__all-row";

  const allBtn = document.createElement("button");
  allBtn.className = "custom-dropdown__option" + (currentTheme === "Todos" ? " is-selected" : "");
  allBtn.setAttribute("role", "option");
  allBtn.dataset.value = "Todos";
  const allDot = document.createElement("span"); allDot.className = "custom-dropdown__dot";
  const allLabel = document.createElement("span"); allLabel.textContent = "Todos os Temas";
  allBtn.appendChild(allDot); allBtn.appendChild(allLabel);
  allBtn.addEventListener("click", () => selectTheme("Todos", isMobile));
  allRow.appendChild(allBtn);
  panelEl.appendChild(allRow);

  /* separador */
  const sep = document.createElement("div");
  sep.className = "custom-dropdown__sep";
  panelEl.appendChild(sep);

  /* ── Grid com os temas ── */
  const grid = document.createElement("div");
  grid.className = "custom-dropdown__grid";

  themes.filter(t => t !== "Todos").forEach(t => {
    const btn = document.createElement("button");
    btn.className = "custom-dropdown__option" + (t === currentTheme ? " is-selected" : "");
    btn.setAttribute("role", "option");
    btn.dataset.value = t;

    const dot = document.createElement("span"); dot.className = "custom-dropdown__dot";
    const label = document.createElement("span"); label.textContent = t;

    btn.appendChild(dot); btn.appendChild(label);
    btn.addEventListener("click", () => selectTheme(t, isMobile));
    grid.appendChild(btn);
  });

  panelEl.appendChild(grid);
}

function buildVersionPanel(panelEl, isMobile) {
  panelEl.innerHTML = "";
  BIBLE_VERSIONS.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "custom-dropdown__option" + (v.id === currentVersion ? " is-selected" : "");
    btn.setAttribute("role", "option");
    btn.dataset.value = v.id;

    const dot = document.createElement("span"); dot.className = "custom-dropdown__dot";
    const label = document.createElement("span"); label.textContent = v.name;

    btn.appendChild(dot); btn.appendChild(label);
    btn.addEventListener("click", () => selectVersion(v.id, isMobile));
    panelEl.appendChild(btn);
  });
}

function selectVersion(versionId, fromMobile) {
  currentVersion = versionId;
  closeAllDropdowns();
  syncVersionUI();
  /* mantém selects ocultos sincronizados */
  const s1 = document.getElementById("versionSelect");
  const s2 = document.getElementById("versionSelectMobile");
  if (s1) s1.value = versionId;
  if (s2) s2.value = versionId;
  if (fromMobile) closeHamburgerMenu();
  show(pool[idx]);

  /* Se o leitor estiver aberto e lendo, recarrega o capítulo na nova versão */
  if (document.getElementById("readerPanel")?.classList.contains("is-reading")) {
    loadReaderChapter();
  }
  if (document.getElementById("contextModal")?.classList.contains("open")) {
    loadContextChapter();
  }
}

function syncVersionUI() {
  const label  = document.getElementById("versionDropdownLabel");
  const labelM = document.getElementById("versionDropdownLabelMobile");
  /* Mostra só o ID curto (ex: "ARA") no trigger */
  if (label)  label.textContent  = currentVersion;
  if (labelM) labelM.textContent = currentVersion;

  ["versionDropdownPanel","versionDropdownPanelMobile"].forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.querySelectorAll(".custom-dropdown__option").forEach(btn => {
      btn.classList.toggle("is-selected", btn.dataset.value === currentVersion);
    });
  });
}

function selectTheme(theme, fromMobile) {
  currentTheme = theme;

  /* Fecha ambos os painéis */
  closeAllDropdowns();

  /* Atualiza labels e marcações */
  syncDropdownUI();

  if (fromMobile) closeHamburgerMenu();
  applyFilter();
}

function syncDropdownUI() {
  const label   = document.getElementById("themeDropdownLabel");
  const labelM  = document.getElementById("themeDropdownLabelMobile");
  const display = currentTheme === "Todos" ? "Todos os Temas" : currentTheme;
  const short   = currentTheme === "Todos" ? "Temas" : currentTheme;
  if (label)  label.textContent  = display;
  if (labelM) labelM.textContent = short;

  /* Atualiza classe is-selected em todos os painéis */
  ["themeDropdownPanel", "themeDropdownPanelMobile"].forEach(id => {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.querySelectorAll(".custom-dropdown__option").forEach(btn => {
      btn.classList.toggle("is-selected", btn.dataset.value === currentTheme);
    });
  });
}

function closeAllDropdowns() {
  ["themeDropdownPanel","themeDropdownPanelMobile","versionDropdownPanel","versionDropdownPanelMobile"].forEach(id => {
    const p = document.getElementById(id);
    if (p) p.classList.remove("is-open");
  });
  ["themeDropdownTrigger","themeDropdownTriggerMobile","versionDropdownTrigger","versionDropdownTriggerMobile"].forEach(id => {
    const t = document.getElementById(id);
    if (t) { t.classList.remove("is-open"); t.setAttribute("aria-expanded","false"); }
  });
}

function toggleDropdown(triggerId, panelId) {
  const trigger = document.getElementById(triggerId);
  const panel   = document.getElementById(panelId);
  if (!trigger || !panel) return;

  const isOpen = panel.classList.contains("is-open");
  closeAllDropdowns();

  if (!isOpen) {
    panel.classList.add("is-open");
    trigger.classList.add("is-open");
    trigger.setAttribute("aria-expanded","true");

    /* Reposiciona para não sair da tela.
       Calcula a posição desejada em coordenadas absolutas e prende
       dentro dos limites visíveis. Escrever left inline sobrepõe
       qualquer alinhamento vindo do CSS (right:0 dos temas, por
       exemplo), então o resultado não depende da classe do painel.
       Usa offsetWidth: o painel está no primeiro quadro da animação
       (scale .97 / translateY) e o getBoundingClientRect dele viria
       distorcido. */
    panel.style.left  = "0";
    panel.style.right = "auto";

    const triggerRect = trigger.getBoundingClientRect();
    const panelWidth  = panel.offsetWidth;
    const container   = document.querySelector(".app-container");
    const cRect       = container ? container.getBoundingClientRect() : { left: 0, right: window.innerWidth };

    const GUTTER   = 8;
    const minLeft  = Math.max(cRect.left, GUTTER);
    const maxRight = Math.min(cRect.right, window.innerWidth - GUTTER);

    /* Começa alinhado à esquerda do gatilho e ajusta se estourar */
    let absLeft = triggerRect.left;
    if (absLeft + panelWidth > maxRight) absLeft = maxRight - panelWidth;
    if (absLeft < minLeft)               absLeft = minLeft;

    panel.style.left = `${Math.round(absLeft - triggerRect.left)}px`;

    /* Scroll até o item selecionado */
    const sel = panel.querySelector(".is-selected");
    if (sel) setTimeout(() => sel.scrollIntoView({ block: "nearest" }), 20);
  }
}

function initThemeDropdowns() {
  /* Temas */
  const panel  = document.getElementById("themeDropdownPanel");
  const panelM = document.getElementById("themeDropdownPanelMobile");
  if (panel)  buildDropdownPanel(panel, false);
  if (panelM) buildDropdownPanel(panelM, true);

  document.getElementById("themeDropdownTrigger")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown("themeDropdownTrigger","themeDropdownPanel");
  });
  document.getElementById("themeDropdownTriggerMobile")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown("themeDropdownTriggerMobile","themeDropdownPanelMobile");
  });

  /* Versões */
  const vPanel  = document.getElementById("versionDropdownPanel");
  const vPanelM = document.getElementById("versionDropdownPanelMobile");
  if (vPanel)  buildVersionPanel(vPanel, false);
  if (vPanelM) buildVersionPanel(vPanelM, true);

  document.getElementById("versionDropdownTrigger")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown("versionDropdownTrigger","versionDropdownPanel");
  });
  document.getElementById("versionDropdownTriggerMobile")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown("versionDropdownTriggerMobile","versionDropdownPanelMobile");
  });

  /* Fecha ao clicar fora */
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) closeAllDropdowns();
  });

  /* Fecha com Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });
}

/* ──────────────────────────────────────────────────────────
   FILTRO E NAVEGAÇÃO
   ──────────────────────────────────────────────────────────*/
const LAST_VERSE_KEY = "devocional-lastVerse";

/* Retorna o índice do versículo do dia (0-based, baseado no dia do ano) */
function getDayIndex(poolArr) {
  const now   = new Date();
  /* Diferença em dias no fuso local, sem depender de milissegundos
     (evita erro de 1 dia em fusos com horário de verão). */
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.round(
    (new Date(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86400000
  ) + 1;
  return (dayOfYear - 1) % poolArr.length;
}

function saveLastVerse(item) {
  try { localStorage.setItem(LAST_VERSE_KEY, item.apiId); } catch {}
}

function restoreLastVerse() {
  /* Ao abrir o app, sempre mostra o versículo do dia */
  idx = getDayIndex(pool);
  return true;
}

function applyFilter(restoring = false) {
  pool = currentTheme === "Todos"
    ? [...verses]
    : verses.filter(v => v.theme === currentTheme);
  idx = 0;
  if (restoring) restoreLastVerse();
  if (pool.length > 0) show(pool[idx]);
  updateNav();
}

function go(dir) {
  if (pool.length === 0) return;
  idx += dir;
  if (idx < 0)            idx = pool.length - 1;
  if (idx >= pool.length) idx = 0;
  show(pool[idx]);
  updateNav();
}

function goRandom() {
  if (pool.length <= 1) return;
  let newIdx;
  do { newIdx = Math.floor(Math.random() * pool.length); }
  while (newIdx === idx);
  idx = newIdx;
  show(pool[idx]);
  updateNav();
}


/* ──────────────────────────────────────────────────────────
   EXIBIR VERSÍCULO
   ──────────────────────────────────────────────────────────*/
async function show(item) {
  if (!item) return;

  const token  = ++_showToken;
  const textEl = document.getElementById("verseText");

  textEl.classList.add("loading");
  textEl.textContent = "Carregando...";

  document.getElementById("verseRef").textContent = item.ref;
  saveLastVerse(item);

  /* Coleta todos os temas associados a esse apiId */
  const allThemesForVerse = [...new Set(
    verses.filter(v => v.apiId === item.apiId).map(v => v.theme)
  )];
  const themeEl = document.getElementById("verseTheme");
  if (allThemesForVerse.length > 1) {
    themeEl.innerHTML = allThemesForVerse
      .map((t, i) => i === 0
        ? `<span>${t}</span>`
        : `<span class="theme-badge__extra">${t}</span>`)
      .join('<span class="theme-badge__sep">·</span>');
  } else {
    themeEl.textContent = item.theme;
  }

  document.getElementById("verseCtx").textContent = item.ctx;
  document.getElementById("dayNum").textContent   = idx + 1;

  try {
    const text = await fetchVerse(item.apiId, currentVersion);
    if (token !== _showToken) return;          // chegou atrasado: descarta
    textEl.textContent = capitalizeFirst(stripQuotes(text));
  } catch (err) {
    console.error("Erro ao buscar versículo:", err);
    if (token !== _showToken) return;
    textEl.textContent = "Não foi possível carregar o versículo.";
  } finally {
    if (token === _showToken) {
      textEl.classList.remove("loading");
      updateFavBtn();
      loadRelated(item);
    }
  }
}

/* ──────────────────────────────────────────────────────────
   NAVEGAÇÃO: BARRA DE PROGRESSO
   ──────────────────────────────────────────────────────────*/
function updateNav() {
  if (pool.length === 0) return;
  const pct = ((idx + 1) / pool.length) * 100;
  document.getElementById("progressFill").style.width = `${pct}%`;
  document.getElementById("dayTotal").textContent = pool.length;
  document.getElementById("dayNum").textContent   = idx + 1;
}

/* ──────────────────────────────────────────────────────────
   COPIAR VERSÍCULO
   ──────────────────────────────────────────────────────────*/
function copyToClipboard() {
  const txt  = document.getElementById("verseText").textContent;
  const ref  = document.getElementById("verseRef").textContent;
  const item = pool[idx];

  const toSup = n => String(n).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("");

  let formatted;

  // Passagem múltipla: apiId com hífen (ex: "PSA.145.15-PSA.145.16")
  if (item && item.apiId.includes("-")) {
    const [startId, endId] = item.apiId.split("-");
    const vStart = parseInt(startId.split(".")[2]);
    const vEnd   = parseInt(endId.split(".")[2]);

    const numVerses = vEnd - vStart + 1;
    let lines;
    if (numVerses === 2) {
      const splitMatch = txt.match(/^(.+?[.!?])\s+([A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ].*)$/s);
      lines = splitMatch ? [splitMatch[1].trim(), splitMatch[2].trim()] : [txt];
    } else {
      lines = [txt];
    }

    if (lines.length === numVerses) {
      const body = lines.map((l, i) => `${toSup(vStart + i)} ${l}`).join("\n");
      formatted = `${body}\n\n${ref}`;
    } else {
      formatted = `${txt}\n\n${ref}`;
    }

  // Versículo único com múltiplos sobrescritos no texto
  } else {
    const matches = txt.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g) || [];
    if (matches.length > 1) {
      /* Quebra linha antes de cada número sobrescrito, menos no começo.
         Sem lookbehind de propósito: (?<!^) só existe no Safari 16.4+,
         e como regex é validada na hora de carregar o arquivo, um iPhone
         mais antigo derrubaria o script inteiro, não só esta função. */
      const body = txt
        .replace(/\s*([⁰¹²³⁴⁵⁶⁷⁸⁹])/g, "\n$1")
        .replace(/^\n+/, "");
      formatted = `${body}\n\n${ref}`;
    } else {
      formatted = `"${txt}" - ${ref}`;
    }
  }

  navigator.clipboard.writeText(formatted).then(() => {
    const btn    = document.querySelector(".copy-btn");
    const status = document.getElementById("copyStatus");
    btn.classList.add("success");
    status.textContent = "Copiado";
    setTimeout(() => {
      btn.classList.remove("success");
      status.textContent = "Copiar";
    }, 1800);
  }).catch(err => console.error("Erro ao copiar:", err));
}


/* ──────────────────────────────────────────────────────────
   VERSÍCULOS RELACIONADOS (mesmo tema)
   ──────────────────────────────────────────────────────────*/
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

/* Escapa para uso dentro de atributo onclick="...('aqui')" */
function escapeAttr(s) {
  return escapeHtml(s).replace(/\\/g, "\\\\");
}

function loadRelated(item) {
  const block = document.getElementById("relatedBlock");
  const list  = document.getElementById("relatedList");
  if (!block || !list || !item) return;

  const related = verses
    .filter(v => v.theme === item.theme && v.apiId !== item.apiId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  if (related.length === 0) { block.style.display = "none"; return; }

  block.style.display = "block";
  list.innerHTML = related.map(v => `
    <button class="related-item" onclick="goToRelated('${escapeAttr(v.apiId)}','${escapeAttr(v.theme)}')">
      <span class="related-ref">${escapeHtml(v.ref)}</span>
      <span class="related-ctx">${escapeHtml(v.ctx.substring(0, 80))}...</span>
    </button>`
  ).join("");
}

function goToRelated(apiId, theme) {
  const found = pool.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (found === -1) return;
  idx = found;
  show(pool[idx]);
  updateNav();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ──────────────────────────────────────────────────────────
   FAVORITOS
   ──────────────────────────────────────────────────────────*/
const FAV_KEY = "devocional-favorites";

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch { return []; }
}

function saveFavorites(favs) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch {}
}

function isCurrentFavorite() {
  const item = pool[idx];
  if (!item) return false;
  return getFavorites().some(f => f.apiId === item.apiId && f.theme === item.theme);
}

function updateFavBtn() {
  const btn    = document.getElementById("favBtn");
  const status = document.getElementById("favStatus");
  const heart  = btn?.querySelector(".icon-heart");
  if (!btn) return;
  const faved = isCurrentFavorite();
  btn.classList.toggle("fav-btn--active", faved);
  if (heart) heart.setAttribute("fill", faved ? "currentColor" : "none");
  if (status) status.textContent = faved ? "Favoritado" : "Favoritar";
}

function toggleFavorite() {
  const item = pool[idx];
  if (!item) return;
  let favs  = getFavorites();
  const key = f => f.apiId === item.apiId && f.theme === item.theme;
  if (favs.some(key)) {
    favs = favs.filter(f => !key(f));
  } else {
    favs.push({ apiId: item.apiId, ref: item.ref, theme: item.theme, ctx: item.ctx });
  }
  saveFavorites(favs);
  updateFavBtn();
  const btn = document.getElementById("favBtn");
  btn?.classList.add("fav-btn--pulse");
  setTimeout(() => btn?.classList.remove("fav-btn--pulse"), 400);
}

function openFavoritesModal() {
  openModal("favoritesModal");
  renderFavoritesList();
}

function closeFavoritesModal() {
  closeModal("favoritesModal");
}

function renderFavoritesList() {
  const body = document.getElementById("favoritesBody");
  const favs = getFavorites();

  if (favs.length === 0) {
    body.innerHTML = `
      <div class="favs-empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);margin-bottom:12px"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <p>Nenhum versículo favoritado ainda.</p>
        <p style="font-size:.88rem;margin-top:6px;color:var(--text-muted)">Toque no coração para guardar os que tocarem seu coração.</p>
      </div>`;
    return;
  }

  body.innerHTML = '<div class="favs-list">' + favs.map((f, i) => `
    <div class="fav-item">
      <div class="fav-item__header">
        <span class="theme-badge theme-badge--sm">${escapeHtml(f.theme)}</span>
        <button class="fav-item__remove" onclick="removeFavorite(${i})" title="Remover dos favoritos">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <button class="fav-item__ref" onclick="goToFavorite('${escapeAttr(f.apiId)}','${escapeAttr(f.theme)}');closeFavoritesModal();">${escapeHtml(f.ref)}</button>
      <p class="fav-item__ctx">${escapeHtml(f.ctx)}</p>
    </div>`
  ).join("") + '</div>';
}

function removeFavorite(i) {
  const favs = getFavorites();
  favs.splice(i, 1);
  saveFavorites(favs);
  renderFavoritesList();
  updateFavBtn();
}

/* Vai até um favorito. Se o tema atual não incluir esse versículo,
   volta o filtro para "Todos" e sincroniza os dropdowns customizados. */
function goToFavorite(apiId, theme) {
  const found = verses.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (found === -1) return;
  if (currentTheme !== "Todos" && verses[found].theme !== currentTheme) {
    currentTheme = "Todos";
    syncDropdownUI();
    pool = [...verses];
  }
  const newIdx = pool.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (newIdx === -1) return;
  idx = newIdx;
  show(pool[idx]);
  updateNav();
}

/* ──────────────────────────────────────────────────────────
   BUSCA POR PALAVRA-CHAVE
   ──────────────────────────────────────────────────────────*/
function openSearchModal() {
  openModal("searchModal");
  const input = document.getElementById("searchInput");
  if (input) { input.value = ""; setTimeout(() => input.focus(), 100); }
  document.getElementById("searchBody").innerHTML =
    '<p class="search-hint">Digite para buscar entre os ' + verses.length + ' versículos.</p>';
}

function closeSearchModal() {
  closeModal("searchModal");
}

function onSearchInput() {
  const q    = normalizeForSearch(document.getElementById("searchInput").value || "").trim();
  const body = document.getElementById("searchBody");
  if (q.length < 2) {
    body.innerHTML = '<p class="search-hint">Continue digitando...</p>';
    return;
  }
  /* Busca sem acento: "salmo" acha "Salmos", "coracao" acha "coração" */
  const results = verses.filter(v =>
    normalizeForSearch(v.ref).includes(q) ||
    normalizeForSearch(v.theme).includes(q) ||
    normalizeForSearch(v.ctx).includes(q)
  );
  if (results.length === 0) {
    body.innerHTML = '<p class="search-hint">Nenhum resultado encontrado.</p>';
    return;
  }
  body.innerHTML = '<div class="favs-list">' + results.map(v => `
    <div class="fav-item">
      <div class="fav-item__header">
        <span class="theme-badge theme-badge--sm">${escapeHtml(v.theme)}</span>
      </div>
      <button class="fav-item__ref" onclick="goToVerseFromSearch('${escapeAttr(v.apiId)}','${escapeAttr(v.theme)}');closeSearchModal();">${escapeHtml(v.ref)}</button>
      <p class="fav-item__ctx">${escapeHtml(v.ctx.substring(0, 120))}...</p>
    </div>`
  ).join("") + '</div>';
}

function goToVerseFromSearch(apiId, theme) {
  const found = verses.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (found === -1) return;
  if (currentTheme !== "Todos" && verses[found].theme !== currentTheme) {
    currentTheme = "Todos";
    syncDropdownUI();
    pool = [...verses];
  }
  const newIdx = pool.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (newIdx === -1) return;
  idx = newIdx;
  show(pool[idx]);
  updateNav();
}

/* ──────────────────────────────────────────────────────────
   MODO ESCURO / CLARO
   ──────────────────────────────────────────────────────────*/
function toggleDark() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("modeIcon").textContent = isLight ? "☀" : "☽";
  const lbl = document.getElementById("themeLabel");
  if (lbl) lbl.textContent = isLight ? "Claro" : "Escuro";
  localStorage.setItem("devocional-mode", isLight ? "light" : "dark");
}

function loadDark() {
  const saved = localStorage.getItem("devocional-mode");
  if (saved === "light") {
    document.body.classList.add("light");
    document.getElementById("modeIcon").textContent = "☀";
    const lbl = document.getElementById("themeLabel");
    if (lbl) lbl.textContent = "Claro";
  } else {
    document.body.classList.remove("light");
    document.getElementById("modeIcon").textContent = "☽";
    const lbl = document.getElementById("themeLabel");
    if (lbl) lbl.textContent = "Escuro";
  }
}


/* ──────────────────────────────────────────────────────────
   TAMANHO DO TEXTO DE LEITURA (5 níveis, arrastando)
   Grava a preferência e vale para o leitor e para o modal
   de passagem, já que altera a variável --reading-size.
   ──────────────────────────────────────────────────────────*/
const READING_SCALE_KEY = "devocional-readingScale";

const READING_SCALES = [
  { label: "Pequeno",       size: "1.02rem", line: "1.8"  },
  { label: "Pequeno-médio", size: "1.13rem", line: "1.82" },
  { label: "Médio",         size: "1.26rem", line: "1.85" },
  { label: "Médio-grande",  size: "1.42rem", line: "1.88" },
  { label: "Grande",        size: "1.62rem", line: "1.9"  },
];

function setReadingScale(step, persist = true) {
  const i = Math.min(READING_SCALES.length - 1, Math.max(0, parseInt(step) - 1));
  const s = READING_SCALES[i];

  document.documentElement.style.setProperty("--reading-size", s.size);
  document.documentElement.style.setProperty("--reading-line", s.line);

  const input = document.getElementById("fontScaleInput");
  const label = document.getElementById("fontScaleLabel");
  if (input) input.value = i + 1;
  if (label) label.textContent = s.label;

  if (persist) {
    try { localStorage.setItem(READING_SCALE_KEY, String(i + 1)); } catch {}
  }
}

function loadReadingScale() {
  let saved = 3;
  try { saved = parseInt(localStorage.getItem(READING_SCALE_KEY)) || 3; } catch {}
  setReadingScale(saved, false);
}

/* ──────────────────────────────────────────────────────────
   ABRIR / FECHAR MODAIS
   Trava a rolagem do fundo: sem isso, rolar dentro do modal
   no celular arrasta a página atrás quando o conteúdo chega
   ao fim, e ao fechar você aparece em outro ponto da página.
   ──────────────────────────────────────────────────────────*/
function openModal(id) {
  document.getElementById(id)?.classList.add("open");
  document.body.classList.add("modal-open");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
  /* Só libera a rolagem se não sobrou nenhum outro modal aberto */
  if (!document.querySelector(".modal-overlay.open")) {
    document.body.classList.remove("modal-open");
  }
}

/* ──────────────────────────────────────────────────────────
   MODAL — LER CAPÍTULO COMPLETO (contexto do versículo)
   ──────────────────────────────────────────────────────────*/
let contextBook      = "JHN";
let contextChapter   = 3;
let contextHighVerse = null;

async function openContextModal() {
  const item = pool[idx];
  if (!item) return;

  const baseId = item.apiId.includes("-") ? item.apiId.split("-")[0] : item.apiId;
  const parts  = baseId.split(".");

  contextBook      = parts[0];
  contextChapter   = parseInt(parts[1]) || 1;
  contextHighVerse = baseId;

  openModal("contextModal");
  await loadContextChapter();
}

async function loadContextChapter() {
  const body  = document.getElementById("contextBody");
  const title = document.getElementById("contextTitle");

  const bookName = BOOKS_PT.find(b => b[0] === contextBook)?.[1] ?? contextBook;
  title.textContent = bookName;
  document.getElementById("contextChapterLabel").textContent = `Cap. ${contextChapter}`;
  document.getElementById("contextPrev").disabled = contextChapter <= 1;
  document.getElementById("contextNext").disabled = true;

  body.innerHTML = `<div class="modal-loading">Carregando capítulo...</div>`;

  try {
    const data   = await loadBibleVersion(currentVersion);
    const abbrev = USFM_TO_ABBREV[contextBook];
    const book   = data.find(b => b.abbrev === abbrev);
    if (!book) throw new Error("Livro não encontrado");
    const chapArr = book.chapters[contextChapter - 1] || [];
    const hasNext = contextChapter < book.chapters.length;

    document.getElementById("contextNext").disabled = !hasNext;

    const content = chapArr.map((text, i) => ({
      name: "verse-span",
      attrs: { verseId: `${contextBook}.${contextChapter}.${i + 1}` },
      items: [{ type: "text", text }]
    }));

    renderChapter({ content, next: hasNext }, contextHighVerse, body);
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Não foi possível carregar o capítulo.</p>`;
  }
}

function contextGo(dir) {
  contextChapter += dir;
  if (contextChapter < 1) contextChapter = 1;
  contextHighVerse = null;
  loadContextChapter();
}

function closeContextModal() {
  const modal = document.getElementById("contextModal");
  closeModal("contextModal");
  _resetVerseSelection(modal.querySelector(".modal-panel"));
}

/* ──────────────────────────────────────────────────────────
   RENDER CAPÍTULO
   ──────────────────────────────────────────────────────────*/

/* Estado da seleção de versículos */
let _selVerseMap   = {};
let _selVerseOrder = [];
let _selBookId     = "";
let _selChapNum    = "";
let _selectedVids  = new Set();

function renderChapter(chapterData, highlightId, container) {
  const items    = chapterData.content || [];
  const verseMap = {};

  function flatText(nodes) {
    if (!nodes) return "";
    if (typeof nodes === "string") return nodes;
    return nodes.map(n => {
      if (typeof n === "string") return n;
      if (n.type === "text" && n.text) return n.text;
      if (n.items) return flatText(n.items);
      return "";
    }).join("");
  }

  function collectVerses(nodes) {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (node.name === "verse-span" && node.attrs?.verseId) {
        const vid = node.attrs.verseId;
        verseMap[vid] = (verseMap[vid] || "") + flatText(node.items);
      } else if (node.items) {
        collectVerses(node.items);
      }
    }
  }

  collectVerses(items);

  const entries = Object.entries(verseMap);

  if (entries.length === 0) {
    container.innerHTML = `<p class="modal-error">Capítulo vazio nesta versão.</p>`;
    return;
  }

  /* Salva mapa global para uso na cópia */
  _selVerseMap   = {};
  _selVerseOrder = [];
  _selectedVids  = new Set();

  _selBookId  = entries[0][0].split(".")[0];
  _selChapNum = entries[0][0].split(".")[1];

  entries.forEach(([vid, text]) => {
    const clean = stripQuotes(text.trim().replace(/^\d+\s*/, ""));
    _selVerseMap[vid]  = clean;
    _selVerseOrder.push(vid);
  });

  const chapNum  = entries[0][0].split(".")[1];
  const bookId   = entries[0][0].split(".")[0];
  const bookName = BOOKS_PT.find(b => b[0] === bookId)?.[1] ?? bookId;

  const rows = entries.map(([vid]) => {
    const verseNum    = vid.split(".")[2] || "";
    const isHighlight = highlightId && vid === highlightId;
    return `
      <div class="reading-verse ${isHighlight ? "reading-verse--source" : ""}" data-id="${vid}" onclick="toggleVerseSelect('${vid}', this)">
        <span class="reading-verse__num">${verseNum}</span>
        <span class="reading-verse__text">${escapeHtml(_selVerseMap[vid])}</span>
      </div>`;
  }).join("");

  container.innerHTML = `
    <article class="reading">
      <header class="reading__head">
        <span class="reading__book">${bookName}</span>
        <span class="reading__chap">${chapNum}</span>
      </header>
      <div class="reading__body">${rows}</div>
    </article>`;

  /* Garante que a barra de seleção existe no modal correto */
  const panel = container.closest(".modal-panel");
  _ensureSelectionBar(container);
  /* Zera o rótulo/visibilidade — senão a barra fica pendurada com a
     contagem do capítulo anterior depois de trocar de capítulo. */
  _updateSelectionBar(panel);

  setTimeout(() => {
    const target = container.querySelector(".reading-verse--source");
    if (!target) { container.scrollTop = 0; return; }

    /* Rola só este contêiner. scrollIntoView rolaria todos os ancestrais
       roláveis, inclusive o painel — que tem overflow:hidden e, por isso,
       não rola com o dedo, mas rola por script. Era isso que empurrava a
       barra do topo do leitor para fora da tela. */
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const top   = container.scrollTop + (tRect.top - cRect.top) - container.clientHeight / 3;

    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, 100);
}

/* Injeta a barra flutuante dentro do modal-panel pai */
function _ensureSelectionBar(container) {
  const panel = container.closest(".modal-panel");
  if (!panel) return;
  if (panel.querySelector(".verse-sel-bar")) return;
  const bar = document.createElement("div");
  bar.className = "verse-sel-bar";
  bar.innerHTML = `
    <span class="verse-sel-label">0 versículos</span>
    <div class="verse-sel-actions">
      <button class="verse-sel-btn verse-sel-btn--ghost" onclick="_clearVerseSelection(this)">Limpar</button>
      <button class="verse-sel-btn verse-sel-btn--copy" onclick="_copyVerseSelection(this)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span class="verse-sel-copy-label">Copiar</span>
      </button>
    </div>`;
  panel.appendChild(bar);
}

function toggleVerseSelect(vid, el) {
  if (_selectedVids.has(vid)) {
    _selectedVids.delete(vid);
    el.classList.remove("reading-verse--selected");
  } else {
    _selectedVids.add(vid);
    el.classList.add("reading-verse--selected");
  }
  _updateSelectionBar(el.closest(".modal-panel"));
}

function _updateSelectionBar(panel) {
  if (!panel) return;
  const bar   = panel.querySelector(".verse-sel-bar");
  const label = panel.querySelector(".verse-sel-label");
  if (!bar || !label) return;
  const count = _selectedVids.size;
  bar.classList.toggle("verse-sel-bar--visible", count > 0);
  label.textContent = count === 1 ? "1 versículo" : `${count} versículos`;
}

/* Limpa seleção e esconde a barra — usado ao fechar os modais */
function _resetVerseSelection(panel) {
  _selectedVids.clear();
  if (!panel) return;
  panel.querySelectorAll(".reading-verse--selected").forEach(el => el.classList.remove("reading-verse--selected"));
  _updateSelectionBar(panel);
}

function _clearVerseSelection(btn) {
  _resetVerseSelection(btn.closest(".modal-panel"));
}

function _copyVerseSelection(btn) {
  if (_selectedVids.size === 0) return;

  /* Ordena pelos índices originais do capítulo */
  const ordered = _selVerseOrder.filter(vid => _selectedVids.has(vid));

  /* Monta referência */
  const _bookName = BOOKS_PT.find(b => b[0] === _selBookId)?.[1] ?? _selBookId;
  const _chapRef  = `${_bookName} ${_selChapNum}`;
  const nums = ordered.map(vid => parseInt(vid.split(".")[2]));
  const min  = Math.min(...nums);
  const max  = Math.max(...nums);
  const ref  = min === max ? `${_chapRef}:${min}` : `${_chapRef}:${min}-${max}`;

  /* Monta o texto final */
  const toSup = n => String(n).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("");
  let formatted;
  if (ordered.length === 1) {
    formatted = `"${_selVerseMap[ordered[0]]}" - ${ref}`;
  } else {
    const lines = ordered.map(vid => {
      const n = parseInt(vid.split(".")[2]);
      return `${toSup(n)} ${_selVerseMap[vid]}`;
    }).join("\n");
    formatted = `${lines}\n\n${ref}`;
  }

  navigator.clipboard.writeText(formatted).then(() => {
    const lbl = btn.querySelector(".verse-sel-copy-label");
    if (lbl) { lbl.textContent = "Copiado!"; setTimeout(() => { lbl.textContent = "Copiar"; }, 1800); }
    btn.classList.add("verse-sel-btn--success");
    setTimeout(() => btn.classList.remove("verse-sel-btn--success"), 1800);
  }).catch(err => console.error("Erro ao copiar:", err));
}

/* ──────────────────────────────────────────────────────────
   LEITOR DE BÍBLIA LIVRE
   ──────────────────────────────────────────────────────────*/
const BOOKS_PT = [
  ["GEN","Gênesis"],["EXO","Êxodo"],["LEV","Levítico"],["NUM","Números"],["DEU","Deuteronômio"],
  ["JOS","Josué"],["JDG","Juízes"],["RUT","Rute"],["1SA","1 Samuel"],["2SA","2 Samuel"],
  ["1KI","1 Reis"],["2KI","2 Reis"],["1CH","1 Crônicas"],["2CH","2 Crônicas"],["EZR","Esdras"],
  ["NEH","Neemias"],["EST","Ester"],["JOB","Jó"],["PSA","Salmos"],["PRO","Provérbios"],
  ["ECC","Eclesiastes"],["SNG","Cantares"],["ISA","Isaías"],["JER","Jeremias"],["LAM","Lamentações"],
  ["EZK","Ezequiel"],["DAN","Daniel"],["HOS","Oséias"],["JOL","Joel"],["AMO","Amós"],
  ["OBA","Obadias"],["JON","Jonas"],["MIC","Miquéias"],["NAM","Naum"],["HAB","Habacuque"],
  ["ZEP","Sofonias"],["HAG","Ageu"],["ZEC","Zacarias"],["MAL","Malaquias"],
  ["MAT","Mateus"],["MRK","Marcos"],["LUK","Lucas"],["JHN","João"],["ACT","Atos"],
  ["ROM","Romanos"],["1CO","1 Coríntios"],["2CO","2 Coríntios"],["GAL","Gálatas"],
  ["EPH","Efésios"],["PHP","Filipenses"],["COL","Colossenses"],["1TH","1 Tessalonicenses"],
  ["2TH","2 Tessalonicenses"],["1TI","1 Timóteo"],["2TI","2 Timóteo"],["TIT","Tito"],
  ["PHM","Filemom"],["HEB","Hebreus"],["JAS","Tiago"],["1PE","1 Pedro"],["2PE","2 Pedro"],
  ["1JN","1 João"],["2JN","2 João"],["3JN","3 João"],["JUD","Judas"],["REV","Apocalipse"]
];

const OT_BOOKS = ["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL"];
const NT_BOOKS = ["MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"];

let readerBook      = null;
let readerChapter   = null;
let readerVerse     = null;
let _readerChapCount = 0;   // total de capítulos do livro aberto

/* Abre sempre na lista de livros, sem herdar a passagem do devocional.
   Para ler o capítulo do versículo do dia existe o botão "Passagem". */
function openBibleReader() {
  readerBook       = null;
  readerChapter    = null;
  readerVerse      = null;
  _readerChapCount = 0;

  openModal("bibleModal");
  renderBookPanel();
}

function closeBibleReader() {
  const modal = document.getElementById("bibleModal");
  closeModal("bibleModal");
  _resetVerseSelection(modal.querySelector(".modal-panel"));
}

/* ──────────────────────────────────────────────────────────
   SELETOR DE PASSAGEM — três passos
   Livro → Capítulo → Versículo. Cada passo substitui o anterior
   na tela, com a volta explícita no topo.
   ──────────────────────────────────────────────────────────*/

/* ── Passo 1: livros ── */
function renderBookPanel() {
  const body  = document.getElementById("readerBody");
  const panel = document.getElementById("readerPanel");
  /* Modo seleção: esconde o botão de referência do topo */
  panel?.classList.remove("is-reading");

  const bookGrid = (ids, label) => {
    const items = ids.map(id => {
      const name   = BOOKS_PT.find(b => b[0] === id)?.[1] ?? id;
      const active = id === readerBook ? "panel-btn--active" : "";
      return `<button class="panel-btn panel-btn--book ${active}"
                      data-book="${id}"
                      data-name="${normalizeForSearch(name)}"
                      onclick="selectBook('${id}')">${name}</button>`;
    }).join("");
    return `
      <div class="panel-section" data-testament>
        <span class="panel-testament-label">${label}</span>
        <div class="panel-grid panel-grid--books">${items}</div>
      </div>`;
  };

  body.innerHTML = `
    <div class="reader-picker">

      <div class="picker-head">
        <div class="picker-head__text">
          <span class="picker-head__title">Escolha o livro</span>
          <span class="picker-head__sub">${BOOKS_PT.length} livros</span>
        </div>
      </div>

      <div class="picker-search">
        <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input type="text" id="bookFilterInput" class="picker-search__input"
               placeholder="Ex: salmos 23:1"
               autocomplete="off" enterkeyhint="go"
               oninput="filterBooks(this.value)"
               onkeydown="onBookFilterKey(event)" />
      </div>

      <p class="picker-hint" id="bookFilterHint" style="display:none"></p>

      <div id="bookGrids">
        ${bookGrid(OT_BOOKS, "Antigo Testamento")}
        ${bookGrid(NT_BOOKS, "Novo Testamento")}
        <p class="picker-empty" id="bookFilterEmpty" style="display:none">Nenhum livro com esse nome.</p>
      </div>

    </div>
  `;

  body.scrollTop = 0;
}

/* ── Filtro de livros: entende também capítulo e versículo ──
   Aceita "salmos", "salmos 23", "salmos 23:1", "sl 23 1", "1 co 13:4".
   A parte numérica só é lida quando vem no fim, depois de um espaço —
   assim "1 João" e "2 Samuel" continuam sendo nome de livro. */
let _pendingRef = { chapter: null, verse: null };

function parseBookQuery(raw) {
  const q = (raw || "").trim();
  const m = q.match(/^(.+?)[\s,]+(\d+)(?:\s*[:.\s]\s*(\d+))?\s*$/);
  if (!m) return { book: normalizeForSearch(q), chapter: null, verse: null };
  return {
    book:    normalizeForSearch(m[1]),
    chapter: parseInt(m[2]),
    verse:   m[3] ? parseInt(m[3]) : null
  };
}

function filterBooks(query) {
  const { book, chapter, verse } = parseBookQuery(query);
  _pendingRef = { chapter, verse };

  const grids = document.getElementById("bookGrids");
  if (!grids) return;

  let anyVisible = false;

  grids.querySelectorAll("[data-testament]").forEach(section => {
    let sectionVisible = false;
    section.querySelectorAll(".panel-btn--book").forEach(btn => {
      const match = !book || btn.dataset.name.includes(book);
      btn.style.display = match ? "" : "none";
      if (match) sectionVisible = true;
    });
    section.style.display = sectionVisible ? "" : "none";
    if (sectionVisible) anyVisible = true;
  });

  const empty = document.getElementById("bookFilterEmpty");
  if (empty) empty.style.display = anyVisible ? "none" : "block";

  /* Dica do que foi entendido, quando há número na busca */
  const hint = document.getElementById("bookFilterHint");
  if (hint) {
    const alvo = bestBookMatch(book);
    if (chapter && alvo && anyVisible) {
      const nome = BOOKS_PT.find(b => b[0] === alvo)?.[1] ?? alvo;
      hint.textContent = `Enter para abrir ${nome} ${chapter}${verse ? ":" + verse : ""}`;
      hint.style.display = "block";
    } else {
      hint.style.display = "none";
    }
  }
}

/* Melhor livro para a busca: nome exato ganha de "começa com",
   que ganha de "contém". Sem isso, "jo" abriria Jó em vez de João. */
function bestBookMatch(book) {
  if (!book) return null;
  const candidatos = BOOKS_PT
    .map(([id, nome]) => ({ id, n: normalizeForSearch(nome) }))
    .filter(c => c.n.includes(book));
  if (candidatos.length === 0) return null;
  return (candidatos.find(c => c.n === book)
       ?? candidatos.find(c => c.n.startsWith(book))
       ?? candidatos[0]).id;
}

/* Enter abre direto o melhor resultado */
function onBookFilterKey(e) {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const { book } = parseBookQuery(e.target.value);
  const alvo = bestBookMatch(book);
  if (alvo) selectBook(alvo);
}

/* ── Passo 2: capítulos do livro escolhido ── */
async function selectBook(bookId) {
  readerBook    = bookId;
  readerChapter = null;
  readerVerse   = null;

  /* Se a busca trouxe capítulo (e talvez versículo), pula direto */
  const salto  = _pendingRef;
  _pendingRef  = { chapter: null, verse: null };

  const body     = document.getElementById("readerBody");
  const bookName = BOOKS_PT.find(b => b[0] === bookId)?.[1] ?? bookId;

  body.innerHTML = `<div class="modal-loading">Carregando capítulos de ${bookName}...</div>`;

  try {
    const data = await loadBibleVersion(currentVersion);
    const book = data.find(b => b.abbrev === USFM_TO_ABBREV[bookId]);
    if (!book) throw new Error("Livro não encontrado");

    _readerChapCount = book.chapters.length;

    if (salto.chapter && salto.chapter >= 1 && salto.chapter <= _readerChapCount) {
      readerChapter = salto.chapter;
      const versos = book.chapters[readerChapter - 1] || [];
      if (salto.verse && salto.verse >= 1 && salto.verse <= versos.length) {
        /* Referência completa: abre a leitura no versículo */
        readerVerse = `${readerBook}.${readerChapter}.${salto.verse}`;
        loadReaderChapter();
      } else {
        /* Só o capítulo: mostra a lista de versículos dele */
        selectChapter(readerChapter);
      }
      return;
    }

    const nums = book.chapters.map((_, i) => {
      const n = i + 1;
      return `<button class="panel-btn panel-btn--num" onclick="selectChapter(${n})">${n}</button>`;
    }).join("");

    body.innerHTML = `
      <div class="reader-picker">
        <div class="picker-head">
          <button class="picker-back" onclick="renderBookPanel()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            <span>Livros</span>
          </button>
          <div class="picker-head__text">
            <span class="picker-head__title">${bookName}</span>
            <span class="picker-head__sub">${_readerChapCount} ${_readerChapCount === 1 ? "capítulo" : "capítulos"}</span>
          </div>
        </div>
        <div class="panel-grid panel-grid--nums">${nums}</div>
      </div>`;

    body.scrollTop = 0;
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar os capítulos.</p>`;
  }
}

/* ── Passo 3: versículos do capítulo escolhido ── */
async function selectChapter(num) {
  readerChapter = parseInt(num);
  readerVerse   = null;

  const body     = document.getElementById("readerBody");
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;

  body.innerHTML = `<div class="modal-loading">Carregando versículos...</div>`;

  try {
    const data = await loadBibleVersion(currentVersion);
    const book = data.find(b => b.abbrev === USFM_TO_ABBREV[readerBook]);
    if (!book) throw new Error("Livro não encontrado");

    const chapArr = book.chapters[readerChapter - 1] || [];
    const total   = chapArr.length;

    const nums = chapArr.map((_, i) => {
      const n = i + 1;
      return `<button class="panel-btn panel-btn--num" onclick="selectVerse(${n})">${n}</button>`;
    }).join("");

    body.innerHTML = `
      <div class="reader-picker">
        <div class="picker-head">
          <button class="picker-back" onclick="selectBook('${readerBook}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            <span>Capítulos</span>
          </button>
          <div class="picker-head__text">
            <span class="picker-head__title">${bookName} ${readerChapter}</span>
            <span class="picker-head__sub">${total} ${total === 1 ? "versículo" : "versículos"}</span>
          </div>
          <button class="picker-open-btn" onclick="openWholeChapter()">
            Ler o capítulo
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l6 6-6 6"/></svg>
          </button>
        </div>
        <span class="panel-section-label">ou comece em um versículo</span>
        <div class="panel-grid panel-grid--nums">${nums}</div>
      </div>`;

    body.scrollTop = 0;
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar os versículos.</p>`;
  }
}

/* ── Abre a leitura destacando um versículo ── */
function selectVerse(num) {
  readerVerse = `${readerBook}.${readerChapter}.${num}`;
  loadReaderChapter();
}

/* ── Abre a leitura do capítulo inteiro, do começo ── */
function openWholeChapter() {
  readerVerse = null;
  loadReaderChapter();
}

/* ── Atualiza o label de referência no header do modal ── */
function updateReaderRefLabel() {
  const el = document.getElementById("readerRefLabel");
  if (!el) return;
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;
  const verseNum = readerVerse ? readerVerse.split(".")[2] : null;
  el.textContent = verseNum
    ? `${bookName} ${readerChapter}:${verseNum}`
    : `${bookName} ${readerChapter}`;
}

/* ── Carrega e renderiza capítulo ── */
async function loadReaderChapter() {
  const body = document.getElementById("readerBody");

  updateReaderRefLabel();
  document.getElementById("readerPanel")?.classList.add("is-reading");
  body.innerHTML = `<div class="modal-loading">Carregando...</div>`;

  try {
    const data   = await loadBibleVersion(currentVersion);
    const book   = data.find(b => b.abbrev === USFM_TO_ABBREV[readerBook]);
    if (!book) throw new Error("Livro não encontrado");

    _readerChapCount = book.chapters.length;
    if (readerChapter > _readerChapCount) readerChapter = _readerChapCount;

    const chapArr = book.chapters[readerChapter - 1] || [];
    const hasNext = readerChapter < _readerChapCount;
    const hasPrev = readerChapter > 1;

    /* Monta objeto compatível com renderChapter */
    const content = chapArr.map((text, i) => ({
      name: "verse-span",
      attrs: { verseId: `${readerBook}.${readerChapter}.${i + 1}` },
      items: [{ type: "text", text }]
    }));

    renderChapter({ content, next: hasNext }, readerVerse ?? "", body);

    /* Navegação de capítulo no rodapé da leitura */
    body.insertAdjacentHTML("beforeend", `
      <div class="reader-chapter-nav">
        <button class="reader-nav-btn" ${hasPrev ? "" : "disabled"} onclick="readerGo(-1)">‹ Anterior</button>
        <button class="reader-nav-btn reader-nav-btn--ghost" onclick="renderBookPanel()">Trocar passagem</button>
        <button class="reader-nav-btn" ${hasNext ? "" : "disabled"} onclick="readerGo(1)">Próximo ›</button>
      </div>`);
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar. Verifique o arquivo da versão.</p>`;
  }
}

/* ── Navegar capítulos com a leitura aberta ── */
function readerGo(dir) {
  const next = readerChapter + dir;
  if (next < 1 || (_readerChapCount && next > _readerChapCount)) return;
  readerChapter = next;
  readerVerse   = null;
  loadReaderChapter();
}

/* ──────────────────────────────────────────────────────────
   MENU HAMBURGUER (mobile)
   ──────────────────────────────────────────────────────────*/
function handleModalClick(e, modalId) {
  if (e.target.id === modalId) {
    if (modalId === 'contextModal') closeContextModal();
    else if (modalId === 'favoritesModal') closeFavoritesModal();
    else if (modalId === 'searchModal') closeSearchModal();
    else closeBibleReader();
  }
}

/* Escape fecha o modal aberto (antes só fechava os dropdowns) */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = document.querySelector(".modal-overlay.open");
  if (!open) return;
  if (open.id === "contextModal")        closeContextModal();
  else if (open.id === "bibleModal")     closeBibleReader();
  else if (open.id === "favoritesModal") closeFavoritesModal();
  else if (open.id === "searchModal")    closeSearchModal();
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn      = document.getElementById('hamburgerBtn');
  const hamburgerToolbar  = document.getElementById('actionToolbar');
  const hamburgerBackdrop = document.getElementById('hamburgerBackdrop');

  if (!hamburgerBtn || !hamburgerToolbar || !hamburgerBackdrop) return;

  hamburgerBtn.addEventListener('click', function() {
    const isOpen = hamburgerBtn.classList.contains('is-open');
    if (isOpen) { closeHamburgerMenu(); } else { openHamburgerMenu(); }
  });

  hamburgerBackdrop.addEventListener('click', closeHamburgerMenu);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeHamburgerMenu();
  });
});

function openHamburgerMenu() {
  const hamburgerBtn      = document.getElementById('hamburgerBtn');
  const hamburgerToolbar  = document.getElementById('actionToolbar');
  const hamburgerBackdrop = document.getElementById('hamburgerBackdrop');
  if (!hamburgerBtn || !hamburgerToolbar || !hamburgerBackdrop) return;

  /* Posiciona o dropdown logo abaixo do header, alinhado à direita */
  const header        = document.querySelector('.app-header');
  const container     = document.querySelector('.app-container');
  const headerRect    = header.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  hamburgerToolbar.style.top = (headerRect.bottom - containerRect.top + 8) + 'px';
  hamburgerToolbar.style.right = '0px';
  hamburgerToolbar.style.position = 'absolute';

  hamburgerBtn.classList.add('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  hamburgerToolbar.classList.add('is-open');
  hamburgerBackdrop.classList.add('is-active');
}

function closeHamburgerMenu() {
  const hamburgerBtn      = document.getElementById('hamburgerBtn');
  const hamburgerToolbar  = document.getElementById('actionToolbar');
  const hamburgerBackdrop = document.getElementById('hamburgerBackdrop');
  if (!hamburgerBtn || !hamburgerToolbar || !hamburgerBackdrop) return;

  hamburgerBtn.classList.remove('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerToolbar.classList.remove('is-open');
  hamburgerBackdrop.classList.remove('is-active');
}