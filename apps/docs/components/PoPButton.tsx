"use client";

import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { fetchAccessToken } from "../utils/fetchAccessToken";
import { launchZkMeWidget } from "../utils/launchWidget";

const PoPButton: React.FC = () => {
  const activeAccountAddress = useActiveAccount()?.address as string;

  return (
    <button
      className="p-4 mt-4 rounded-lg font-medium"
      onClick={() => launchZkMeWidget(activeAccountAddress, fetchAccessToken)}
    >
      <p>Prove your personhood</p>
    </button>
  );
};

export default PoPButton;
