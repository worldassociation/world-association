// This function fetches a new access token from the specified API endpoint.

export async function fetchAccessToken(): Promise<string> {
  const apiKey = process.env.ZKME_API_KEY;
  const appId = process.env.ZKME_APP_ID;

  return fetch("https://nest-api.zk.me/api/token/get", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      apiKey: apiKey,
      appId: appId,
      apiModePermission: 1,
      lv: 2,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
      return result.data.accessToken.toString();
    });
}
