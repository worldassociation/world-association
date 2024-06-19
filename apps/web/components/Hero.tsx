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
                <PoPButton />
                <a
                  href="https://worldcoin.org/download-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>
                    <img
                      src="/img/icons/worldcoin.png"
                      alt="Icon Description"
                      width="24"
                      height="24"
                    />
                    <p>Verify with Worldcoin</p>
                  </button>
                </a>
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
