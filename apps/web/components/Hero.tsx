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
            <p className="text-[4.7vw] pt-2">
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
            <p className="text-[4.7vw] pt-2 max-w-[656px]">
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
            <div className="w-[100vw] max-w-[406px] mt-8 px-6 md:pr-0 md:pl-12">
              <Card>
                <CardHeader>
                  <CardTitle>Get started</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="card-content">
                    Prove your personhood, join the Association, and get our
                    official currency flow into your account every second.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="text-left flex gap-4 justify-start w-full hover:border-blue-500 hover:bg-transparent"
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
