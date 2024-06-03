// This function fetches a new access token from the specified API endpoint.

export async function fetchAccessToken() {
  console.log("fetchAccessToken");
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
      console.log("Received response from API");
      if (res.ok) return res.json();
      else {
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .then((result) => {
      console.log("Processing result");
      if (result.code === 80000000) {
        console.log("Access token fetched successfully");
        return result.data.data.accessToken;
      } else {
        console.log("Error in result");
        return Promise.reject(result);
      }
    })
    .catch((error) => {
      console.log("Error caught", error);
      throw error;
    });
}
