import type { NextApiRequest, NextApiResponse } from "next";
import { CFAv1Forwarder } from "../../lib/constants";

const {
  THIRDWEB_ENGINE_URL,
  THIRDWEB_ENGINE_ACCESS_TOKEN,
  THIRDWEB_BACKEND_WALLET_ADDRESS,
  THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS,
} = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Received request to create stream:", req.body); // Log the incoming request body

  // Extract data from the incoming request
  const { toAddress } = req.body;

  // Define the thirdweb stream creation endpoint
  const streamCreationEndpoint = `${THIRDWEB_ENGINE_URL}/contract/base/${CFAv1Forwarder}/write?simulateTx=false`;
  console.log("Stream creation endpoint:", streamCreationEndpoint); // Log the stream creation endpoint

  // Make the POST request to the thirdweb stream creation endpoint
  try {
    console.log("Sending stream creation request to thirdweb..."); // Log before sending the request
    const streamCreationResponse = await fetch(streamCreationEndpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-backend-wallet-address": THIRDWEB_BACKEND_WALLET_ADDRESS as string,
        "x-account-address": THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS as string,
        "Content-Type": "application/json",
        Authorization: `Bearer ${THIRDWEB_ENGINE_ACCESS_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      // TODO: Update fetch request body. ABI: https://docs.superfluid.finance/docs/technical-reference/CFAv1Forwarder#abi
      // body: JSON.stringify({
      //   toAddress: toAddress,
      //   amount: 1,
      // }),
    });

    console.log(
      "Stream creation response status:",
      streamCreationResponse.status
    ); // Log the response status

    // Check if the request was successful
    if (streamCreationResponse.ok) {
      const data = await streamCreationResponse.json();
      console.log("Stream creation successful:", data); // Log the successful response data
      res.status(200).json(data);
    } else {
      // Handle errors from the thirdweb stream creation endpoint
      const errorData = await streamCreationResponse.json();
      console.error("Stream creation error response:", errorData); // Log the error response data
      res.status(streamCreationResponse.status).json(errorData);
    }
  } catch (error) {
    console.error("Stream creation request failed:", error); // Log the catch block error
    res.status(500).json({ error: "Failed to create stream" });
  }
}
