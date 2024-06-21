"use client";

import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { fetchAccessToken } from "../utils/fetchAccessToken";
import { launchZkMeWidget } from "../utils/launchWidget";

const PoPButton: React.FC = () => {
  const activeAccountAddress = useActiveAccount()?.address as string;

  return (
    <button
      id="zkMeButton"
      onClick={() => launchZkMeWidget(activeAccountAddress, fetchAccessToken)}
    >
      <img
        src="/img/icons/zkMe.png"
        alt="Icon Description"
        width="24"
        height="24"
      />
      <p>Join with zkMe</p>
    </button>
  );
};

export default PoPButton;
