export default async function handler(req, res) {
    const { appid } = req.query;

    if (!appid) {
        return res.status(400).json({
            error: "appid não informado"
        });
    }

    const response = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic,screenshots`
    );

    const data = await response.json();

    return res.status(200).json(data);
}