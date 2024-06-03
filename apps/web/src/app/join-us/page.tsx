"use client";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
  useSendBatchTransaction,
} from "thirdweb/react";
import { accountAbstraction, client, tokenDropContract } from "../constants";
import Link from "next/link";
import { getBalance, claimTo as claimToken } from "thirdweb/extensions/erc20";

const JoinHome = () => {
  const smartAccount = useActiveAccount();
  const { data: tokenBalance, refetch: refetchTokens } = useReadContract(
    getBalance,
    {
      contract: tokenDropContract,
      address: smartAccount?.address!,
      queryOptions: { enabled: !!smartAccount },
    },
  );
  const { mutate: sendBatch, isPending } = useSendBatchTransaction();

  const handleClick = async () => {
    if (!smartAccount) return;

    const transaction = [
      claimToken({
        contract: tokenDropContract,
        quantity: "1",
        to: smartAccount.address,
      }),
    ];
    sendBatch(transaction, {
      onError: (error) => {
        alert(`Error: ${error.message}`);
      },
      onSuccess: (result) => {
        refetchTokens();
        alert("Success! Tx hash: " + result.transactionHash);
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
        Join Us
      </h1>
      <ConnectButton
        client={client}
        accountAbstraction={accountAbstraction}
        connectButton={{
          label: "Sign in",
        }}
        connectModal={{
          size: "compact",
          showThirdwebBranding: false,
        }}
      />
      <div className="flex flex-col mt-8 gap-4">
        {smartAccount ? (
          <>
            {tokenBalance?.value ? (
              <p className="text-center">
                You are already a member of the World Association.
              </p>
            ) : (
              <button
                className="p-4 rounded-lg bg-white text-black font-medium"
                onClick={handleClick}
                disabled={isPending}
              >
                {isPending
                  ? "Claiming member token..."
                  : "Prove your personhood!"}
              </button>
            )}
          </>
        ) : (
          <p>Sign in to get started</p>
        )}
      </div>
      <Link href={"/"} className="text-sm text-gray-400 mt-8">
        Back to menu
      </Link>
    </div>
  );
};

export default JoinHome;
