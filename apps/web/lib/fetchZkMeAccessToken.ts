export async function fetchAccessToken(): Promise<string> {
  return fetch("https://nest-api.zk.me/api/token/get", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "9f1465af.833be9b6c3f5cb2c3829f5484fa0dcd5",
      appId: "M2024053066119595336406774111128",
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
