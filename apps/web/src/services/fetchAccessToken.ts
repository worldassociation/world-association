// This function fetches a new access token from the specified API endpoint.

export async function fetchAccessToken() {
  return fetch("https://nest-api.zk.me/api/token/get", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      apiKey: "c9dddb71.7d81fc2e56579bbb5303da3391c9e275",
      appId: "M2024053066119595336406774111128",
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
