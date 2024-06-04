"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../constants";
import Link from "next/link";
import PoPButton from "../../components/PoPButton";
import "@zkmelabs/widget/dist/style.css";
import { base } from "thirdweb/chains";

const ProveYourPersonhoodHome = () => {
  const account = useActiveAccount();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
        Prove your Personhood
      </h1>
      <ConnectButton
        client={client}
        chain={base}
        connectButton={{
          label: "Sign in",
        }}
        connectModal={{
          size: "compact",
          showThirdwebBranding: false,
        }}
      />
      <div className="flex flex-col mt-8 gap-4">
        {account ? <PoPButton /> : <p>Sign in to get started</p>}
      </div>
      <Link href={"/"} className="text-sm text-gray-400 mt-8">
        Back to menu
      </Link>
    </div>
  );
};

export default ProveYourPersonhoodHome;
