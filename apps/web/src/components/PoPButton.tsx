"use client";

import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { fetchAccessToken } from "../services/fetchAccessToken";
import { launchZkMeWidget } from "../services/widgetProvider";

const PoPButton: React.FC = () => {
  const activeAccountAddress = useActiveAccount()?.address as string;

  return (
    <button
      className="p-4 mt-4 rounded-lg bg-white text-black font-medium"
      onClick={() => launchZkMeWidget(activeAccountAddress, fetchAccessToken)}
    >
      <p>Prove your personhood</p>
    </button>
  );
};

export default PoPButton;
