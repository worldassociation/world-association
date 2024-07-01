import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";
import { SmartWalletOptions } from "thirdweb/wallets";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const chain = base;

export const CFAv1Forwarder = 0xcfa132e353cb4e398080b9700609bb008eceb125;

export const accountAbstraction: SmartWalletOptions = {
  chain,
  sponsorGas: true,
};
