/* ──────────────────────────────────────────────────────────
   SERVICE WORKER — Devocional Helper

   Estratégia:
   · App shell (HTML/CSS/JS/ícones) e a versão padrão da Bíblia
     entram no precache na instalação.
   · As outras versões (ARC, NAA) são grandes, então só entram
     no cache quando você abre uma delas pela primeira vez.
   · Fontes do Google ficam num cache separado, que sobrevive
     à troca de versão do app.

   Ao publicar mudanças, suba o número em CACHE_VERSION. Isso
   invalida o cache antigo e força o download dos arquivos novos.
   ──────────────────────────────────────────────────────────*/

   const CACHE_VERSION = "v1";
   const SHELL_CACHE   = `devocional-shell-${CACHE_VERSION}`;
   const BIBLE_CACHE   = `devocional-biblias-${CACHE_VERSION}`;
   const FONT_CACHE    = "devocional-fontes";
   
   /* Caminhos relativos: o app roda em /devocional_helper/ no
      GitHub Pages, então nada aqui pode começar com "/". */
   const SHELL_ASSETS = [
     "./",
     "./index.html",
     "./style.css",
     "./script.js",
     "./versiculos.js",
     "./manifest.json",
     "./favicon.ico",
     "./icons/icon-192.png",
     "./icons/icon-512.png",
     "./icons/icon-maskable-512.png",
     "./versoes/ARA.json"
   ];
   
   /* ── Instalação: monta o precache ── */
   self.addEventListener("install", event => {
     event.waitUntil((async () => {
       const cache = await caches.open(SHELL_CACHE);
       /* addAll falha inteiro se um arquivo faltar. Como a lista tem
          itens opcionais, cada um é buscado por conta própria. */
       await Promise.all(SHELL_ASSETS.map(async url => {
         try {
           const res = await fetch(url, { cache: "reload" });
           if (res.ok) await cache.put(url, res);
         } catch (e) {
           console.warn("[SW] não consegui pré-cachear:", url);
         }
       }));
       self.skipWaiting();
     })());
   });
   
   /* ── Ativação: limpa caches de versões anteriores ── */
   self.addEventListener("activate", event => {
     event.waitUntil((async () => {
       const keep = [SHELL_CACHE, BIBLE_CACHE, FONT_CACHE];
       const names = await caches.keys();
       await Promise.all(
         names.filter(n => n.startsWith("devocional-") && !keep.includes(n))
              .map(n => caches.delete(n))
       );
       await self.clients.claim();
     })());
   });
   
   /* ── Helpers ── */
   const isBible = url => /\/versoes\/.+\.json$/.test(url.pathname);
   const isFont  = url => url.hostname === "fonts.googleapis.com"
                       || url.hostname === "fonts.gstatic.com";
   
   /* Cache primeiro, rede como reserva. Guarda o que baixar. */
   async function cacheFirst(request, cacheName) {
     const cache  = await caches.open(cacheName);
     const cached = await cache.match(request);
     if (cached) return cached;
   
     const response = await fetch(request);
     if (response.ok) cache.put(request, response.clone());
     return response;
   }
   
   /* Rede primeiro, cache como reserva. Usado no app shell para
      você receber atualizações sem precisar limpar nada, mas ainda
      abrir o app sem internet. */
   async function networkFirst(request, cacheName) {
     const cache = await caches.open(cacheName);
     try {
       const response = await fetch(request);
       if (response.ok) cache.put(request, response.clone());
       return response;
     } catch (e) {
       const cached = await cache.match(request);
       if (cached) return cached;
       /* Navegação offline sem cache da rota: cai no index */
       if (request.mode === "navigate") {
         const shell = await cache.match("./index.html");
         if (shell) return shell;
       }
       throw e;
     }
   }
   
   /* ── Interceptação ── */
   self.addEventListener("fetch", event => {
     const { request } = event;
   
     /* Só GET. POST e afins passam direto. */
     if (request.method !== "GET") return;
   
     const url = new URL(request.url);
   
     /* Fontes do Google: cache primeiro, cache próprio */
     if (isFont(url)) {
       event.respondWith(cacheFirst(request, FONT_CACHE));
       return;
     }
   
     /* Outros domínios não são interceptados */
     if (url.origin !== self.location.origin) return;
   
     /* Bíblias: arquivo grande e imutável, cache primeiro */
     if (isBible(url)) {
       event.respondWith(cacheFirst(request, BIBLE_CACHE));
       return;
     }
   
     /* App shell: rede primeiro, cache como reserva */
     event.respondWith(networkFirst(request, SHELL_CACHE));
   });
   
   /* Permite forçar a atualização a partir da página */
   self.addEventListener("message", event => {
     if (event.data === "skipWaiting") self.skipWaiting();
   });