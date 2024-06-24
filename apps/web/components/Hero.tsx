import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { chain, client } from "../lib/constants";
import "@zkmelabs/widget/dist/style.css";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { verifyProof } from "../lib/verifyWorldIDProof";
import { fetchAccessToken } from "../lib/fetchZkMeAccessToken";
import { launchZkMeWidget } from "../lib/launchZkMeWidget";

export default function Hero() {
  const account = useActiveAccount();
  const customTheme = lightTheme({
    colors: { borderColor: "#e6e6eb", modalBg: "#ffffff" },
  });

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };

  return (
    <div className="hero">
      <div className="wrapper w-4/5 m-auto flex justify-center md:justify-between items-center flex-col md:flex-row gap-4 md:gap-8">
        <div className="hero-text text-center md:text-left">
          <h1 className="text-5xl md:text-[56px] lg:text-[64px] leading-snug pt-12 md:pt-0">
            World Association
          </h1>
          <p className="text-lg md:text-xl pt-2">
            The democratic United Nations alternative.
          </p>
          <div className="connect-button">
            {!account && (
              <ConnectButton
                client={client}
                chain={chain}
                theme={"light"}
                connectButton={{
                  label: "Sign in",
                  style: {
                    backgroundColor: "#1a1a1d",
                    color: "#fcfcfc",
                    padding: "16px",
                    alignItems: "center",
                    width: "224px",
                  },
                }}
                connectModal={{ showThirdwebBranding: false }}
              />
            )}
          </div>
        </div>
        <div>
          {account ? (
            <div className="w-[360px]">
              <h3 className="md:pb-2 text-center text-xl">
                Join us anonymously
              </h3>
              <div className="pop-content flex flex-col items-center gap-4 p-6 md:rounded-[20px]">
                <button
                  className="text-left items-center rounded-xl flex p-4 gap-4 justify-start w-[224px] md:w-full"
                  onClick={() =>
                    launchZkMeWidget(account.address, fetchAccessToken)
                  }
                >
                  <img
                    src="/img/icons/zkMe.png"
                    alt="Icon Description"
                    width="24"
                    height="24"
                  />
                  <p>Join with zkMe</p>
                </button>
                <IDKitWidget
                  app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
                  action={process.env.NEXT_PUBLIC_WLD_ACTION!}
                  verification_level={VerificationLevel.Device}
                  handleVerify={verifyProof}
                  onSuccess={onSuccess}
                >
                  {({ open }) => (
                    <button
                      className="text-left items-center rounded-xl flex p-4 gap-4 justify-start w-[224px] md:w-full"
                      onClick={open}
                    >
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
                  <button className="text-left items-center rounded-xl flex p-4 gap-4 justify-start w-[224px] md:w-[312px]">
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
              <h3 className="pb-2 text-center text-xl">Sign in</h3>
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
