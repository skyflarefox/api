export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { appid } = req.query;

  if (!appid || !/^\d+$/.test(appid)) {
    return res.status(400).json({ error: "appid inválido" });
  }

  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=name,screenshots`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    const data = await response.json();

    // Cache de 1 hora — mesma requisição não bate no proxy de novo
   res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Falha ao contatar a Steam" });
  }
}