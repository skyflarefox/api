import http from "node:http";

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const appid = url.searchParams.get("appid");

  if (!appid) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "appid não informado" }));
    return;
  }

  try {
    const response = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=name,screenshots`
    );
    const data = await response.json();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch Steam data" }));
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${port}`);
});