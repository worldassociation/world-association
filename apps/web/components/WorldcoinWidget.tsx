import React from "react";
import { Button } from "./ui/button";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const WorldcoinWidget = ({ verifyProof, onSuccess }) => {
  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
      action={process.env.NEXT_PUBLIC_WLD_ACTION!}
      verification_level={VerificationLevel.Device}
      handleVerify={verifyProof}
      onSuccess={onSuccess}
    >
      {({ open }) => (
        <Button
          variant="outline"
          className="text-left flex gap-4 justify-start w-full hover:border-blue-500 hover:bg-transparent"
          onClick={open}
        >
          <img
            src="/img/icons/worldcoin.png"
            alt="Icon Description"
            width="24"
            height="24"
          />
          <p>Join with Worldcoin</p>
        </Button>
      )}
    </IDKitWidget>
  );
};

export default WorldcoinWidget;
