const response = await fetch(
  `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=name,screenshots`,
  {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; SteamProxy/1.0)',
      'Accept': 'application/json'
    }
  }
);