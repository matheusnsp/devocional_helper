/* ──────────────────────────────────────────────────────────
   Vercel Serverless Function — proxy YouVersion API
   Arquivo: /api/bible.js

   Variável de ambiente necessária no Vercel:
     YVP_APP_KEY = sua_chave_aqui

   Uso pelo frontend:
     GET /api/bible?path=/v1/bibles/212/passages/JHN.3.16&format=text
   ──────────────────────────────────────────────────────────*/

   export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    // Lê a URL raw para não perder as barras do path
    const rawUrl  = req.url; // ex: /api/bible?path=/v1/bibles/212/passages/JHN.3.16&format=text
    const qStart  = rawUrl.indexOf("?");
    const qs      = qStart !== -1 ? rawUrl.slice(qStart + 1) : "";
    const params  = new URLSearchParams(qs);
    const path    = params.get("path");
  
    if (!path || !path.startsWith("/v1/")) {
      return res.status(400).json({ error: "Invalid path" });
    }
  
    // Remove o 'path' da query e repassa o resto para a YouVersion
    params.delete("path");
    const upstreamQs  = params.toString();
    const upstreamUrl = `https://api.youversion.com${path}${upstreamQs ? "?" + upstreamQs : ""}`;
  
    try {
      const upstream = await fetch(upstreamUrl, {
        headers: {
          "X-YVP-App-Key": process.env.YVP_APP_KEY,
          "Accept": "application/json",
        },
      });
  
      const data = await upstream.json();
  
      res
        .status(upstream.status)
        .setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800")
        .json(data);
  
    } catch (err) {
      console.error("YouVersion proxy error:", err);
      res.status(502).json({ error: "Upstream error" });
    }
  }