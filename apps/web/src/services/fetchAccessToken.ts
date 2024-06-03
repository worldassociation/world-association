// This function fetches a new access token from the specified API endpoint.

export async function fetchAccessToken() {
  return fetch("https://nest-api.zk.me/api/token/get", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      apiKey: process.env.ZKME_API_KEY,
      appId: process.env.ZKME_APP_ID,
      apiModePermission: 1,
      lv: 2,
    }),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((result) => {
      console.log(result);
      console.log(result.data.accessToken);
      return result.data.accessToken;
    });
}
