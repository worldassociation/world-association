"use client";
import type React from "react";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import {
  accountAbstraction,
  chain,
  client,
  tokenDropContract,
} from "../constants";
import Link from "next/link";
import { getBalance, claimTo } from "thirdweb/extensions/erc20";
import { baseSepolia } from "thirdweb/chains";

const GovernanceTokenHome: React.FC = () => {
  const smartAccount = useActiveAccount();
  const { data: tokenBalance, refetch: refetchTokens } = useReadContract(
    getBalance,
    {
      contract: tokenDropContract,
      address: smartAccount?.address!,
      queryOptions: { enabled: !!smartAccount },
    },
  );
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100 text-center">
        Collect your Governance Token
      </h1>
      <ConnectButton
        client={client}
        chain={baseSepolia}
        accountAbstraction={accountAbstraction}
        connectButton={{
          label: "Sign in",
        }}
        connectModal={{
          size: "compact",
          showThirdwebBranding: false,
        }}
      />
      <div className="flex flex-col">
        <>
          {smartAccount ? (
            <>
              <p className="font-semibold text-center my-6">
                You have {tokenBalance?.displayValue?.toString() || "0"}{" "}
                governance tokens
              </p>
              <TransactionButton
                transaction={() =>
                  claimTo({
                    contract: tokenDropContract,
                    quantity: "1",
                    to: smartAccount.address,
                  })
                }
                onError={(error) => {
                  alert(`Error: ${error.message}`);
                }}
                onTransactionConfirmed={async () => {
                  refetchTokens();
                  alert("Successful!");
                }}
              >
                Collect
              </TransactionButton>
            </>
          ) : (
            <p className="text-center mt-8">
              Sign in to collect your governance token
            </p>
          )}
        </>
      </div>
      <Link href={"/"} className="text-sm text-gray-400 mt-8">
        Back to menu
      </Link>
    </div>
  );
};

export default GovernanceTokenHome;
