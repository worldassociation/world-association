"use client";

import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { fetchAccessToken } from "../utils/fetchAccessToken";
import { launchZkMeWidget } from "../utils/launchWidget";

const PoPButton: React.FC = () => {
  const activeAccountAddress = useActiveAccount()?.address as string;

  return (
    <button
      onClick={() => launchZkMeWidget(activeAccountAddress, fetchAccessToken)}
    >
      <p>Start verification</p>
    </button>
  );
};

export default PoPButton;
