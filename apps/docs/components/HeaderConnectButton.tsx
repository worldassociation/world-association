import React from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { chain, client } from "../utils/constants";

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
          color: "#090909",
          backgroundColor: "#ffffff",
          borderColor: "#e5e7eb",
        },
      }}
    />
  );
};

export default HeaderConnectButton;
