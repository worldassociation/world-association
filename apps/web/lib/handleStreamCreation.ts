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

  await fetch("/api/createStream", options)
    .then((response) => {
      if (response.status === 200) {
        toast({
          description: "Stream created successfully.",
        });
        console.log("Stream created successfully.");
      }
    })
    .catch((err) => {
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
      console.error(err);
      console.log("error creating stream: " + err);
    });
};
