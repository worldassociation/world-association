import React from "react";
import {
  ConnectButton,
  ConnectEmbed,
  lightTheme,
  useActiveAccount,
} from "thirdweb/react";
import { chain, client } from "../lib/constants";
import "@zkmelabs/widget/dist/style.css";
import { fetchAccessToken } from "../lib/fetchZkMeAccessToken";
import { launchZkMeWidget } from "../lib/launchZkMeWidget";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Hero() {
  const account = useActiveAccount();
  const customTheme = lightTheme({
    colors: { borderColor: "#e6e6eb", modalBg: "#ffffff" },
  });

  return (
    <div
      className="md:w-4/5 m-auto flex justify-center md:justify-between items-center flex-col md:flex-row gap-8"
      style={{ minHeight: "calc(100vh - 128px)" }}
    >
      <div className="hero-text text-center md:text-left">
        {!account ? (
          <>
            <h1 className="text-[13vw] leading-snug pt-12 md:pt-0">
              World Association
            </h1>
            <p className="text-[4.7vw] text-[#666] pt-2">
              The democratic United Nations alternative.
            </p>
            <div className="block md:hidden mt-8">
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
                    width: "calc(100vw - 48px)",
                    maxWidth: "400px",
                    borderRadius: "1rem",
                  },
                }}
                connectModal={{ showThirdwebBranding: false }}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[13vw] leading-snug pt-12 md:pt-0">
              Uniting humanity
            </h1>
            <p className="text-[4.7vw] text-[#666] pt-2 max-w-[640px]">
              The World Association is an open-source global democracy
              experiment with an own digital currency that anyone can join
              completely anonymously.
            </p>
          </>
        )}
      </div>
      <div>
        {account ? (
          <>
            <div className="w-[100vw] max-w-[406px] mt-8 md:mt-0 px-6 md:pr-0 md:pl-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Join us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="card-content text-center text-[14px] text-[#666]">
                    Join us anonymously and get your basic income flowing into
                    your account every second.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-[48px] text-[14px] bg-[#005563] hover:bg-[#004957] rounded-full"
                    onClick={() =>
                      launchZkMeWidget(account.address, fetchAccessToken)
                    }
                  >
                    Prove your personhood
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="w-[100vw] max-w-[406px] mt-4 px-6 md:pr-0 md:pl-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Experiment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="card-content text-center text-[14px] text-[#666]">
                    Create and vote on verifiably democratic global governance
                    proposals.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full h-[48px] text-[14px] rounded-full"
                    onClick={() =>
                      window.open(
                        "https://snapshot.org/#/worldassociation.eth",
                        "_blank"
                      )
                    }
                  >
                    Open Snapshot
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="w-[100vw] max-w-[406px] mt-4 px-6 md:pr-0 md:pl-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Contribute</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="card-content text-center text-[14px] text-[#666]">
                    Help us improve the World Association and get rewarded in
                    our official currency.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full h-[48px] text-[14px] rounded-full"
                    onClick={() =>
                      window.open(
                        "https://github.com/worldassociation/world-association",
                        "_blank"
                      )
                    }
                  >
                    Open GitHub
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        ) : (
          <div className="hidden md:block">
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
  );
}
