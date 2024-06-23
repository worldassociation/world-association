import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { chain, client } from "../lib/constants";
import "@zkmelabs/widget/dist/style.css";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import type { VerifyReply } from "../pages/api/verifyWorldID";
import PoPButton from "../components/PoPButton";
import { useState } from "react";

export default function Hero() {
  const account = useActiveAccount();

  const customTheme = lightTheme({
    colors: { borderColor: "#e5e7eb", modalBg: "#ffffff" },
  });

  const [isMinting, setIsMinting] = useState<boolean>(false);

  const verifyProof = async (result: ISuccessResult) => {
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

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };

  const handleMint = async () => {
    setIsMinting(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toAddress: account?.address,
      }),
    };

    // fetch api/mint endpoint
    await fetch("/api/mintToken", options)
      .then((response) => {
        // if status is 200 display toast success
        if (response.status === 200) {
          console.log("minted token successfully");
          setIsMinting(false);
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("error minting token: " + err);
        setIsMinting(false);
      });
  };

  return (
    <div className="hero">
      <div className="wrapper">
        <div className="hero-text">
          <h1>World Association</h1>
          <p>The democratic United Nations alternative.</p>
          <div className="connect-button">
            {!account && (
              <ConnectButton
                client={client}
                chain={chain}
                theme={"light"}
                connectButton={{
                  label: "Sign in",
                  style: {
                    backgroundColor: "#090909",
                    color: "#fff",
                    padding: "16px",
                    alignItems: "center",
                    width: "312px",
                  },
                }}
                connectModal={{ showThirdwebBranding: false }}
              />
            )}
          </div>
        </div>
        <div>
          {account ? (
            <div className="pop">
              <h3>Join us anonymously</h3>
              <div className="pop-content">
                <PoPButton />
                <IDKitWidget
                  app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
                  action={process.env.NEXT_PUBLIC_WLD_ACTION!}
                  verification_level={VerificationLevel.Device}
                  handleVerify={verifyProof}
                  onSuccess={onSuccess}
                >
                  {({ open }) => (
                    <button onClick={open}>
                      <img
                        src="/img/icons/worldcoin.png"
                        alt="Icon Description"
                        width="24"
                        height="24"
                      />
                      <p>Join with Worldcoin</p>
                    </button>
                  )}
                </IDKitWidget>
                <a
                  href="https://www.coinbase.com/onchain-verify"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <img
                      src="/img/icons/coinbase.png"
                      alt="Icon Description"
                      width="24"
                      height="24"
                    />
                    <p>Join with Coinbase</p>
                  </button>
                </a>
                <button onClick={handleMint} disabled={isMinting}>
                  {isMinting ? "Minting..." : "Mint Global Democracy Token"}
                </button>
              </div>
            </div>
          ) : (
            <div className="connect-embed">
              <h3>Sign in</h3>
              <ConnectEmbed
                client={client}
                chain={chain}
                theme={customTheme}
                showThirdwebBranding={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
