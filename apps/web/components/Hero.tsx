import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { chain, client } from "../utils/constants";
import "@zkmelabs/widget/dist/style.css";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import PoPButton from "../components/PoPButton";

export default function Hero() {
  const account = useActiveAccount();

  const customTheme = lightTheme({
    colors: { borderColor: "#e5e7eb", modalBg: "#ffffff" },
  });

  // TODO: Calls your implemented server route
  const verifyProof = async (proof) => {
    throw new Error("TODO: verify proof server route");
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };

  return (
    <div className="hero">
      <div className="wrapper">
        <div className="hero-text">
          <h1>World Association</h1>
          <p>The democratic organization uniting humanity.</p>
          <div className="connect-button">
            {!account && (
              <ConnectButton
                client={client}
                chain={chain}
                theme={"light"}
                connectButton={{
                  label: "Sign in",
                  style: { backgroundColor: "#090909", color: "#ffffff" },
                }}
                connectModal={{ showThirdwebBranding: false }}
              />
            )}
          </div>
        </div>
        <div>
          {account ? (
            <div className="pop">
              <h3>Verify your uniqueness</h3>
              <div className="pop-content">
                <IDKitWidget
                  app_id="app_880aceacfcfbc104c4702143603579ab"
                  action="verify-with-worldcoin"
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
                      <p>Verify with Worldcoin</p>
                    </button>
                  )}
                </IDKitWidget>
                <PoPButton />
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
                    <p>Verify with Coinbase</p>
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
