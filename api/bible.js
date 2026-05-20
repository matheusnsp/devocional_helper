/* ──────────────────────────────────────────────────────────
   Vercel Serverless Function — proxy YouVersion API
   Arquivo: /api/bible.js

   Variável de ambiente necessária no Vercel:
     YVP_APP_KEY = sua_chave_aqui

   Uso pelo frontend:
     GET /api/bible?path=/v1/bibles/212/passages/JHN.3.16&format=text
   ──────────────────────────────────────────────────────────*/

   export default async function handler(req, res) {
    /* Só aceita GET */
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { path, ...queryParams } = req.query;
  
    /* Valida que o path existe e aponta para a YouVersion API */
    if (!path || !path.startsWith("/v1/")) {
      return res.status(400).json({ error: "Invalid path" });
    }
  
    /* Monta query string repassando todos os outros parâmetros */
    const qs = new URLSearchParams(queryParams).toString();
    const url = `https://api.youversion.com${path}${qs ? "?" + qs : ""}`;
  
    try {
      const upstream = await fetch(url, {
        headers: {
          "X-YVP-App-Key": process.env.YVP_APP_KEY,
          "Accept": "application/json",
        },
      });
  
      const data = await upstream.json();
  
      /* Repassa o status code da YouVersion */
      res
        .status(upstream.status)
        .setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
        .json(data);
  
    } catch (err) {
      console.error("YouVersion proxy error:", err);
      res.status(502).json({ error: "Upstream error" });
    }
  }