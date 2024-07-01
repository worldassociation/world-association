import { Account } from "thirdweb/wallets";
import { useToast } from "../components/ui/use-toast";

export const handleMint = async (account: Account) => {
  const { toast } = useToast();
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toAddress: account?.address,
    }),
  };

  await fetch("/api/mintToken", options)
    .then((response) => {
      if (response.status === 200) {
        toast({
          description: "Token minted successfully.",
        });
        console.log("Token minted successfully.");
      }
    })
    .catch((err) => {
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
      console.error(err);
      console.log("error minting token: " + err);
    });
};
