import type { ISuccessResult } from "@worldcoin/idkit";
import type { VerifyReply } from "../pages/api/verifyWorldID";

export const verifyProof = async (result: ISuccessResult) => {
  console.log("Proof received from IDKit:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
  const reqBody = {
    merkle_root: result.merkle_root,
    nullifier_hash: result.nullifier_hash,
    proof: result.proof,
    verification_level: result.verification_level,
    action: process.env.NEXT_PUBLIC_WLD_ACTION,
    signal: "",
  };
  console.log(
    "Sending proof to backend for verification:\n",
    JSON.stringify(reqBody)
  ); // Log the proof being sent to our backend for visibility
  const res: Response = await fetch("/api/verifyWorldID", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  const data: VerifyReply = await res.json();
  if (res.status == 200) {
    console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
  } else {
    throw new Error(
      `Error code ${res.status} (${data.code}): ${data.detail}` ??
        "Unknown error."
    ); // Throw an error if verification fails
  }
};
