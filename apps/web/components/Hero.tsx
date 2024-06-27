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
    <>
      <div
        className={
          account
            ? "md:w-4/5 m-auto flex justify-center items-center flex-col gap-8"
            : "md:w-4/5 m-auto flex justify-center md:justify-between items-center flex-col md:flex-row gap-8"
        }
        style={{ minHeight: "calc(100vh - 128px)" }}
      >
        <div
          className={
            account
              ? "hero-text text-center"
              : "hero-text text-center md:text-left"
          }
        >
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
                      height: "58px",
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
              <h1 className="text-[13vw] leading-snug pt-12 lg:pt-0">
                Uniting humanity
              </h1>
              <p className="text-[4.7vw] text-[#666] pt-2 pb-4 max-w-[640px]">
                The World Association is an open-source, verifiably democratic
                global governance experiment with an own digital currency that
                anyone can join completely anonymously.
              </p>
            </>
          )}
        </div>
        <div>
          {account ? (
            <div className="grid gap-6 lg:grid-cols-3 justify-center content-stretch xl:mt-4">
              <div className="w-[100vw] lg:w-auto max-w-[406px] mt-4 lg:mt-0 px-6 lg:px-0">
                <Card className="flex flex-col justify-between h-full">
                  <div>
                    <CardHeader>
                      <CardTitle className="text-center">Join</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="card-content text-[14px] text-[#666]">
                        Join us and claim your basic income simply by proving
                        that you are a real and unique human.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <Button
                      className="w-full h-[48px] text-[14px] bg-[#005563] hover:bg-[#005563]/90 rounded-full"
                      onClick={() =>
                        launchZkMeWidget(account.address, fetchAccessToken)
                      }
                    >
                      Prove your personhood
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="w-[100vw] lg:w-auto max-w-[406px] px-6 lg:px-0">
                <Card className="flex flex-col justify-between h-full">
                  <div>
                    <CardHeader>
                      <CardTitle className="text-center">Experiment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="card-content text-[14px] text-[#666]">
                        Create and vote on proposals addressing humanity's most
                        pressing global challenges.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <Button
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
              <div className="w-[100vw] lg:w-auto max-w-[406px] px-6 lg:px-0">
                <Card className="flex flex-col justify-between h-full">
                  <div>
                    <CardHeader>
                      <CardTitle className="text-center">Contribute</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="card-content text-[14px] text-[#666]">
                        Help us improve the World Association and get rewarded
                        in our official currency.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter>
                    <Button
                      className="w-full h-[48px] text-[14px] rounded-full"
                      onClick={() =>
                        window.open(
                          "https://contribute.worldassociation.org",
                          "_blank"
                        )
                      }
                    >
                      Discover opportunities
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
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
    </>
  );
}
