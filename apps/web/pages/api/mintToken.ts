import type { NextApiRequest, NextApiResponse } from "next";

const {
  THIRDWEB_ENGINE_URL,
  THIRDWEB_ENGINE_ACCESS_TOKEN,
  THIRDWEB_BACKEND_WALLET_ADDRESS,
  THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS,
  GLOBAL_DEMOCRACY_TOKEN_CONTRACT_ADDRESS,
} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request to mint token:", req.body); // Log the incoming request body

  // Extract data from the incoming request
  const { toAddress } = req.body;

  // Define the thirdweb mint endpoint
  const mintEndpoint = `${THIRDWEB_ENGINE_URL}/contract/base/${GLOBAL_DEMOCRACY_TOKEN_CONTRACT_ADDRESS}/erc20/mint-to?simulateTx=false`;
  console.log("Mint endpoint:", mintEndpoint); // Log the mint endpoint

  // Make the POST request to the thirdweb mint endpoint
  try {
    console.log("Sending mint request to thirdweb..."); // Log before sending the request
    const mintResponse = await fetch(mintEndpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-backend-wallet-address": THIRDWEB_BACKEND_WALLET_ADDRESS as string,
        "x-account-address": THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS as string,
        "Content-Type": "application/json",
        Authorization: `Bearer ${THIRDWEB_ENGINE_ACCESS_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        toAddress: toAddress,
        amount: 1,
      }),
    });

    console.log("Mint response status:", mintResponse.status); // Log the response status

    // Check if the request was successful
    if (mintResponse.ok) {
      const data = await mintResponse.json();
      console.log("Mint successful:", data); // Log the successful response data
      res.status(200).json(data);
    } else {
      // Handle errors from the thirdweb mint endpoint
      const errorData = await mintResponse.json();
      console.error("Mint error response:", errorData); // Log the error response data
      res.status(mintResponse.status).json(errorData);
    }
  } catch (error) {
    console.error("Mint request failed:", error); // Log the catch block error
    res.status(500).json({ error: "Failed to mint token" });
  }
}
