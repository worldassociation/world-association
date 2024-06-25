import React from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { chain, client } from "../lib/constants";

const HeaderConnectButton = () => {
  const activeAccountAddress = useActiveAccount()?.address;

  return !activeAccountAddress ? (
    <></>
  ) : (
    <ConnectButton
      client={client}
      chain={chain}
      theme={"light"}
      detailsButton={{
        style: {
          height: "52px",
          color: "#1a1a1d",
          backgroundColor: "#ffffff",
          borderColor: "#e6e6eb",
        },
      }}
    />
  );
};

export default HeaderConnectButton;
