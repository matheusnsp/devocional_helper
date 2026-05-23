/* ── Remove aspas tipográficas da API ── */
function capitalizeFirst(text) {
  if (!text) return text;
  const t = text.trimStart();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function stripQuotes(text) {
  return text.replace(/[“”„‟‘’]/g, "");
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
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  return _bibleCache[versionId];
}

/* Mapeamento USFM (usado nos apiId) → abreviação do JSON */
const USFM_TO_ABBREV = {
  GEN:"Gn", EXO:"Ex", LEV:"Lv", NUM:"Nm", DEU:"Dt",
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

  /* Passagem (ex: "ROM.8.38-ROM.8.39") */
  if (apiId.includes("-")) {
    const [startId, endId] = apiId.split("-");
    const [book, chap, vStart] = startId.split(".");
    const vEnd = endId.split(".")[2];
    const abbrev = USFM_TO_ABBREV[book];
    const bookData = data.find(b => b.abbrev === abbrev);
    if (!bookData) return "";
    const chapArr = bookData.chapters[parseInt(chap) - 1] || [];
    const texts = [];
    for (let v = parseInt(vStart); v <= parseInt(vEnd); v++) {
      const t = chapArr[v - 1];
      if (t) texts.push(t);
    }
    return texts.join(" ");
  }

  /* Versículo simples (ex: "JHN.3.16") */
  const [book, chap, verse] = apiId.split(".");
  const abbrev = USFM_TO_ABBREV[book];
  const bookData = data.find(b => b.abbrev === abbrev);
  if (!bookData) return "";
  return bookData.chapters[parseInt(chap) - 1]?.[parseInt(verse) - 1] ?? "";
}


   /* Versões locais disponíveis (arquivo JSON em versoes/<id>.json) */
   const BIBLE_VERSIONS = [
    // { id: "ARA", name: "ARA", lang: "pt" },
    { id: "ARA", name: "ARA — Almeida Revista e Atualizada", lang: "pt" },
    // { id: "ARC", name: "ARC", lang: "pt" },
    { id: "ARC", name: "ARC — Almeida Revista e Corrigida", lang: "pt" },
    // { id: "NAA", name: "NAA", lang: "pt" },
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
let isLoading      = false;

/* ──────────────────────────────────────────────────────────
   INICIALIZAÇÃO
   ──────────────────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", () => {
  populateThemes();
  populateVersions();
  initThemeDropdowns();
  loadDark();
  applyFilter(true);

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

    /* Reposiciona para não sair do app-container */
    panel.style.left  = "";
    panel.style.right = "";
    const panelRect     = panel.getBoundingClientRect();
    const triggerRect   = trigger.getBoundingClientRect();
    const container     = document.querySelector(".app-container");
    const containerRect = container ? container.getBoundingClientRect() : { left: 0, right: window.innerWidth };

    /* Tenta alinhar à esquerda do trigger */
    const overflowRight = panelRect.right - containerRect.right;
    const overflowLeft  = containerRect.left - panelRect.left;

    if (overflowRight > 0) {
      /* Empurra para a esquerda o suficiente para caber */
      panel.style.left = "auto";
      panel.style.right = "0";
    } else if (overflowLeft > 0) {
      panel.style.left = "0";
      panel.style.right = "auto";
    }

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
   FILTRO E NAVEGAÇÃO
   ──────────────────────────────────────────────────────────*/
const LAST_VERSE_KEY = "devocional-lastVerse";

/* Retorna o índice do versículo do dia (0-based, baseado no dia do ano) */
function getDayIndex(poolArr) {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff  = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)); // 1..365
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
  if (!item || isLoading) return;
  isLoading = true;

  const textEl = document.getElementById("verseText");
  textEl.classList.add("loading");
  textEl.textContent = "Carregando...";

  document.getElementById("verseRef").textContent   = item.ref;
  saveLastVerse(item);
  document.getElementById("verseTheme").textContent = item.theme;
  document.getElementById("verseCtx").textContent   = item.ctx;

  document.getElementById("dayNum").textContent = pool.indexOf(item) + 1;

  try {
    const text = await fetchVerse(item.apiId, currentVersion);
    textEl.textContent = capitalizeFirst(stripQuotes(text));
  } catch (err) {
    console.error("Erro ao buscar versículo:", err);
    textEl.textContent = "Não foi possível carregar o versículo.";
  } finally {
    textEl.classList.remove("loading");
    isLoading = false;
    updateFavBtn();
    loadRelated(item);
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

    // Tenta separar pelo ponto final entre os versículos
    // Estratégia: divide o texto em frases e distribui pelos números
    const numVerses = vEnd - vStart + 1;
    // Separa por ". " mas preservando abreviações comuns — usa split simples em ". "
    // Para passagens de 2 versículos, tenta achar o ponto que divide
    let lines;
    if (numVerses === 2) {
      // Acha o primeiro ponto final seguido de espaço maiúsculo (provável divisão de versículo)
      const splitMatch = txt.match(/^(.+?[.!?])\s+([A-ZÁÉÍÓÚÀÂÊÔÃÕÜÇ].*)$/s);
      if (splitMatch) {
        lines = [splitMatch[1].trim(), splitMatch[2].trim()];
      } else {
        lines = [txt];
      }
    } else {
      lines = [txt];
    }

    if (lines.length === numVerses) {
      const body = lines.map((l, i) => `${toSup(vStart + i)} ${l}`).join("\n");
      formatted = `${body}\n\n${ref}`;
    } else {
      // Fallback: texto inteiro sem aspas
      formatted = `${txt}\n\n${ref}`;
    }

  // Versículo único com múltiplos sobrescritos no texto
  } else {
    const matches = txt.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g) || [];
    if (matches.length > 1) {
      const body = txt.replace(/(?<!^)\s*(?=[⁰¹²³⁴⁵⁶⁷⁸⁹])/g, "\n");
      formatted = `${body}\n\n${ref}`;
    } else {
      formatted = `"${txt}" - ${ref}`;
    }
  }

  navigator.clipboard.writeText(formatted).then(() => {
    const btn    = document.querySelector(".copy-btn");
    const status = document.getElementById("copyStatus");
    btn.classList.add("success");
    status.textContent = "Copiado!";
    setTimeout(() => {
      btn.classList.remove("success");
      status.textContent = "Copiar";
    }, 1800);
  }).catch(err => console.error("Erro ao copiar:", err));
}



/* ──────────────────────────────────────────────────────────
   VERSÍCULOS RELACIONADOS (mesmo tema)
   ──────────────────────────────────────────────────────────*/
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
    <button class="related-item" onclick="goToRelated('${v.apiId}','${v.theme.replace(/'/g,"\\'")}')">
      <span class="related-ref">${v.ref}</span>
      <span class="related-ctx">${v.ctx.substring(0, 80)}...</span>
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
  document.getElementById("favoritesModal").classList.add("open");
  renderFavoritesList();
}

function closeFavoritesModal() {
  document.getElementById("favoritesModal").classList.remove("open");
}

function renderFavoritesList() {
  const body = document.getElementById("favoritesBody");
  const favs = getFavorites();

  if (favs.length === 0) {
    body.innerHTML = `
      <div class="favs-empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-muted);margin-bottom:12px"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <p>Nenhum versículo favoritado ainda.</p>
        <p style="font-size:.8rem;margin-top:4px;color:var(--text-muted)">Toque no coração para guardar os que tocarem seu coração.</p>
      </div>`;
    return;
  }

  body.innerHTML = '<div class="favs-list">' + favs.map((f, i) => `
    <div class="fav-item">
      <div class="fav-item__header">
        <span class="theme-badge" style="font-size:.58rem;padding:6px 12px">${f.theme}</span>
        <button class="fav-item__remove" onclick="removeFavorite(${i})" title="Remover dos favoritos">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <button class="fav-item__ref" onclick="goToFavorite('${f.apiId}','${f.theme.replace(/'/g,"\\'")}');closeFavoritesModal();">${f.ref}</button>
      <p class="fav-item__ctx">${f.ctx}</p>
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

function goToFavorite(apiId, theme) {
  const found = verses.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (found === -1) return;
  if (currentTheme !== "Todos" && verses[found].theme !== currentTheme) {
    currentTheme = "Todos";
    document.getElementById("themeFilter").value = "Todos"; document.getElementById("themeFilterMobile").value = "Todos";
    pool = [...verses];
  }
  const newIdx = pool.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (newIdx === -1) return;
  idx = newIdx;
  show(pool[idx]);
  updateNav();
}

/* ──────────────────────────────────────────────────────────

/* ──────────────────────────────────────────────────────────
   BUSCA POR PALAVRA-CHAVE
   ──────────────────────────────────────────────────────────*/
function openSearchModal() {
  document.getElementById("searchModal").classList.add("open");
  const input = document.getElementById("searchInput");
  if (input) { input.value = ""; setTimeout(() => input.focus(), 100); }
  document.getElementById("searchBody").innerHTML = '<p class="search-hint">Digite para buscar entre os ' + verses.length + ' versículos.</p>';
}

function closeSearchModal() {
  document.getElementById("searchModal").classList.remove("open");
}

function onSearchInput() {
  const q    = (document.getElementById("searchInput").value || "").trim().toLowerCase();
  const body = document.getElementById("searchBody");
  if (q.length < 2) {
    body.innerHTML = '<p class="search-hint">Continue digitando...</p>';
    return;
  }
  const results = verses.filter(v =>
    v.ref.toLowerCase().includes(q) ||
    v.theme.toLowerCase().includes(q) ||
    v.ctx.toLowerCase().includes(q)
  );
  if (results.length === 0) {
    body.innerHTML = '<p class="search-hint">Nenhum resultado encontrado.</p>';
    return;
  }
  body.innerHTML = '<div class="favs-list">' + results.map(v => `
    <div class="fav-item">
      <div class="fav-item__header">
        <span class="theme-badge" style="font-size:.58rem;padding:6px 12px">${v.theme}</span>
      </div>
      <button class="fav-item__ref" onclick="goToVerseFromSearch('${v.apiId}','${v.theme.replace(/'/g,"\\'")}');closeSearchModal();">${v.ref}</button>
      <p class="fav-item__ctx">${v.ctx.substring(0, 120)}...</p>
    </div>`
  ).join("") + '</div>';
}

function goToVerseFromSearch(apiId, theme) {
  const found = verses.findIndex(v => v.apiId === apiId && v.theme === theme);
  if (found === -1) return;
  if (currentTheme !== "Todos" && verses[found].theme !== currentTheme) {
    currentTheme = "Todos";
    document.getElementById("themeFilter").value = "Todos"; document.getElementById("themeFilterMobile").value = "Todos";
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

  document.getElementById("contextModal").classList.add("open");
  await loadContextChapter();
}

async function loadContextChapter() {
  const chapterId = `${contextBook}.${contextChapter}`;
  const body      = document.getElementById("contextBody");
  const title     = document.getElementById("contextTitle");

  title.textContent = `Capítulo ${contextChapter}`;
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
  document.getElementById("contextModal").classList.remove("open");
  _selectedVids.clear();
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
    container.innerHTML = `<p style="color:var(--text-secondary);line-height:1.9">${chapterData.content ?? ""}</p>`;
    return;
  }

  /* Salva mapa global para uso na cópia */
  _selVerseMap   = {};
  _selVerseOrder = [];
  _selectedVids  = new Set();

  /* Salva book/chap — nome resolvido na hora da cópia (BOOKS_PT existe lá) */
  _selBookId  = entries[0][0].split(".")[0];
  _selChapNum = entries[0][0].split(".")[1];

  entries.forEach(([vid, text]) => {
    const clean = stripQuotes(text.trim().replace(/^\d+\s*/, ""));
    _selVerseMap[vid]  = clean;
    _selVerseOrder.push(vid);
  });

  const html = entries.map(([vid, text]) => {
    const verseNum    = vid.split(".")[2] || "";
    const isHighlight = highlightId && vid === highlightId;
    const clean       = _selVerseMap[vid];
    return `
      <div class="chapter-verse ${isHighlight ? "verse-highlight" : ""}" data-id="${vid}" data-verse="${verseNum}" onclick="toggleVerseSelect('${vid}', this)">
        <span class="verse-num">${verseNum}</span>
        <span class="verse-words">${clean}</span>
      </div>`;
  }).join("");

  container.innerHTML = `<div class="chapter-verses">${html}</div>`;

  /* Garante que a barra de seleção existe no modal correto */
  _ensureSelectionBar(container);

  setTimeout(() => {
    const target = container.querySelector(".verse-highlight") ?? container.querySelector(".chapter-verse");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);
}

/* Injeta a barra flutuante dentro do modal-panel pai */
function _ensureSelectionBar(container) {
  const panel = container.closest(".modal-panel");
  if (!panel) return;
  if (panel.querySelector(".verse-sel-bar")) return;
  const bar = document.createElement("div");
  bar.className = "verse-sel-bar";
  bar.id = "verseSelBar_" + Date.now();
  bar.innerHTML = `
    <span class="verse-sel-label" id="verseSelLabel_${bar.id}">0 versículos</span>
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
    el.classList.remove("verse-selected");
  } else {
    _selectedVids.add(vid);
    el.classList.add("verse-selected");
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

function _clearVerseSelection(btn) {
  _selectedVids.clear();
  const panel = btn.closest(".modal-panel");
  panel.querySelectorAll(".verse-selected").forEach(el => el.classList.remove("verse-selected"));
  _updateSelectionBar(panel);
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

let readerBook       = "JHN";
let readerChapter    = 1;
let readerVerse      = null;
let selectorChapters = [];
let selectorVerses   = [];

function openBibleReader() {
  const item = pool[idx];
  if (item) {
    const base = item.apiId.includes("-") ? item.apiId.split("-")[0] : item.apiId;
    const p    = base.split(".");
    readerBook    = p[0];
    readerChapter = parseInt(p[1]) || 1;
    readerVerse   = base;
  }

  document.getElementById("bibleModal").classList.add("open");
  renderBookPanel();
}

function closeBibleReader() {
  document.getElementById("bibleModal").classList.remove("open");
  _selectedVids.clear();
}


/* ── Painel: Livros ── */
function renderBookPanel() {
  const body = document.getElementById("readerBody");
  const refBtn = document.getElementById("readerRefBtn");
  if (refBtn) refBtn.style.display = "none";

  const bookGrid = (ids, label) => {
    const items = ids.map(id => {
      const name   = BOOKS_PT.find(b => b[0] === id)?.[1] ?? id;
      const active = id === readerBook ? "panel-btn--active" : "";
      return `<button class="panel-btn ${active}" onclick="selectBook('${id}')">${name}</button>`;
    }).join("");
    return `
      <div class="panel-section">
        <span class="panel-testament-label">${label}</span>
        <div class="panel-grid panel-grid--books">${items}</div>
      </div>`;
  };

  body.innerHTML = `
    <div class="reader-panel">
      <div class="panel-breadcrumb">
        <span class="panel-crumb panel-crumb--active">Livro</span>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb">Capítulo</span>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb">Versículo</span>
      </div>
      ${bookGrid(OT_BOOKS, "Antigo Testamento")}
      ${bookGrid(NT_BOOKS, "Novo Testamento")}
    </div>
  `;
}

/* ── Seleciona livro → monta lista de capítulos a partir do JSON local ── */
async function selectBook(bookId) {
  readerBook    = bookId;
  readerChapter = 1;
  readerVerse   = null;

  const body = document.getElementById("readerBody");
  body.innerHTML = `<div class="modal-loading">Carregando capítulos...</div>`;

  try {
    const data   = await loadBibleVersion(currentVersion);
    const abbrev = USFM_TO_ABBREV[bookId];
    const book   = data.find(b => b.abbrev === abbrev);
    if (!book) throw new Error("Livro não encontrado");
    selectorChapters = book.chapters.map((_, i) => ({ number: String(i + 1) }));
    renderChapterPanel();
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar capítulos.</p>`;
  }
}

/* ── Painel: Capítulos ── */
function renderChapterPanel() {
  const body     = document.getElementById("readerBody");
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;

  const items = selectorChapters.map(c => {
    const active = parseInt(c.number) === readerChapter ? "panel-btn--active" : "";
    return `<button class="panel-btn panel-btn--num ${active}" onclick="selectChapter(${c.number})">${c.number}</button>`;
  }).join("");

  body.innerHTML = `
    <div class="reader-panel">
      <div class="panel-breadcrumb">
        <button class="panel-crumb panel-crumb--link" onclick="renderBookPanel()">Livro</button>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb panel-crumb--active">${bookName}</span>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb">Capítulo</span>
      </div>
      <div class="panel-section">
        <span class="panel-section-label">Capítulo</span>
        <div class="panel-grid panel-grid--nums">${items}</div>
      </div>
    </div>
  `;
}

/* ── Seleciona capítulo → monta lista de versículos a partir do JSON local ── */
async function selectChapter(num) {
  readerChapter = parseInt(num);

  const body = document.getElementById("readerBody");
  body.innerHTML = `<div class="modal-loading">Carregando versículos...</div>`;

  try {
    const data   = await loadBibleVersion(currentVersion);
    const abbrev = USFM_TO_ABBREV[readerBook];
    const book   = data.find(b => b.abbrev === abbrev);
    if (!book) throw new Error("Livro não encontrado");
    const chapArr = book.chapters[readerChapter - 1] || [];
    selectorVerses = chapArr.map((_, i) => ({
      id:     `${readerBook}.${readerChapter}.${i + 1}`,
      number: String(i + 1)
    }));
    renderVersePanel();
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar versículos.</p>`;
  }
}

/* ── Painel: Versículos ── */
function renderVersePanel() {
  const body     = document.getElementById("readerBody");
  const bookName = BOOKS_PT.find(b => b[0] === readerBook)?.[1] ?? readerBook;

  const items = selectorVerses.map(v =>
    `<button class="panel-btn panel-btn--num" onclick="selectVerse('${v.number}')">${v.number}</button>`
  ).join("");

  body.innerHTML = `
    <div class="reader-panel">
      <div class="panel-breadcrumb">
        <button class="panel-crumb panel-crumb--link" onclick="renderBookPanel()">Livro</button>
        <span class="panel-crumb-sep">›</span>
        <button class="panel-crumb panel-crumb--link" onclick="renderChapterPanel()">${bookName}</button>
        <span class="panel-crumb-sep">›</span>
        <span class="panel-crumb panel-crumb--active">Cap. ${readerChapter}</span>
      </div>
      <div class="panel-section">
        <span class="panel-section-label">
          Versículo — ou <button class="panel-link" onclick="selectVerse(null)">abrir do início</button>
        </span>
        <div class="panel-grid panel-grid--nums">${items}</div>
      </div>
    </div>
  `;
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

/* ── Seleciona versículo → abre leitura ── */
function selectVerse(num) {
  readerVerse = num ? `${readerBook}.${readerChapter}.${num}` : null;
  loadReaderChapter();
}

/* ── Carrega e renderiza capítulo ── */
async function loadReaderChapter() {
  const body = document.getElementById("readerBody");

  updateReaderRefLabel();
  const refBtn = document.getElementById("readerRefBtn");
  if (refBtn) refBtn.style.display = "flex";
  body.innerHTML = `<div class="modal-loading">Carregando...</div>`;

  try {
    const data   = await loadBibleVersion(currentVersion);
    const abbrev = USFM_TO_ABBREV[readerBook];
    const book   = data.find(b => b.abbrev === abbrev);
    if (!book) throw new Error("Livro não encontrado");
    const chapArr = book.chapters[readerChapter - 1] || [];
    const hasNext = readerChapter < book.chapters.length;

    /* Monta objeto compatível com renderChapter */
    const content = chapArr.map((text, i) => ({
      name: "verse-span",
      attrs: { verseId: `${readerBook}.${readerChapter}.${i + 1}` },
      items: [{ type: "text", text }]
    }));

    renderChapter({ content, next: hasNext }, readerVerse ?? "", body);
  } catch(e) {
    body.innerHTML = `<p class="modal-error">Erro ao carregar. Verifique o arquivo da versão.</p>`;
  }
}

/* ── Navegar capítulos após leitura aberta ── */
function readerGo(dir) {
  readerChapter += dir;
  if (readerChapter < 1) readerChapter = 1;
  readerVerse = null;
  loadReaderChapter();
}

/* ── Troca livro pelo select do header ── */
function readerBookChanged() {
  readerBook    = document.getElementById("readerBookSelect").value;
  readerChapter = 1;
  readerVerse   = null;
  selectBook(readerBook);
}

/* ── Popula select do header (mantido para compatibilidade) ── */
function populateBookSelect() {
  const sel = document.getElementById("readerBookSelect");
  if (!sel) return;
  sel.innerHTML = "";
  BOOKS_PT.forEach(([id, name]) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = name;
    if (id === readerBook) opt.selected = true;
    sel.appendChild(opt);
  });
}