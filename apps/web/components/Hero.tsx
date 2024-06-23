import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { chain, client } from "../lib/constants";
import "@zkmelabs/widget/dist/style.css";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { verifyProof } from "../lib/verifyProof";
import PoPButton from "../components/PoPButton";
import { useToast } from "./ui/use-toast";

export default function Hero() {
  const account = useActiveAccount();
  const customTheme = lightTheme({
    colors: { borderColor: "#e5e7eb", modalBg: "#ffffff" },
  });
  const { toast } = useToast();

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };

  const handleMint = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toAddress: account?.address,
      }),
    };

    await fetch("/api/mintToken", options)
      .then((response) => {
        if (response.status === 200) {
          toast({
            description: "Token minted successfully.",
          });
          console.log("Token minted successfully.");
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Uh oh! Something went wrong.",
        });
        console.error(err);
        console.log("error minting token: " + err);
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
