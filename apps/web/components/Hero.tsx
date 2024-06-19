import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { chain, client } from "../utils/constants";
import "@zkmelabs/widget/dist/style.css";
import PoPButton from "../components/PoPButton";

export default function Hero() {
  const account = useActiveAccount();
  const customTheme = lightTheme({
    colors: { borderColor: "#e5e7eb", modalBg: "#ffffff" },
  });
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
              <h3>Prove your personhood</h3>
              <div className="pop-content">
                <p>
                  Join us completely anonymously by only proving that you are a
                  real and unique human.
                </p>
                <PoPButton />
                <a
                  href="https://worldcoin.org/download-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Verify with Worldcoin</button>
                </a>
                <a
                  href="https://www.coinbase.com/onchain-verify"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Verify with Coinbase</button>
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
