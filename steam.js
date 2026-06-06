export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { appid } = req.query;

  if (!appid) {
    return res.status(400).json({ error: "appid não informado" });
  }

  // Valida que é só número (evita injection na URL)
  if (!/^\d+$/.test(appid)) {
    return res.status(400).json({ error: "appid inválido" });
  }

  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=name,screenshots`,
      {
        headers: {
          // Faz a Steam aceitar a requisição vinda do servidor
          'User-Agent': 'Mozilla/5.0 (compatible; SteamProxy/1.0)',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      return res.status(502).json({ error: `Steam retornou ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (e) {
    console.error('[steam proxy] erro:', e);
    return res.status(500).json({ error: 'Falha ao contatar a Steam', detail: e.message });
  }
}