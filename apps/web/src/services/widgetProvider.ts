import {
  LoginMode,
  Provider,
  Theme,
  VerificationLevel,
  ZkMeWidget,
} from "@zkmelabs/widget";

/**
 * Launches the ZkMe widget with the provided parameters.
 * @param activeAccount - The active account of the user.
 * @param fetchNewToken - A function that fetches a new access token.
 */
export function launchZkMeWidget(
  activeAccount: string,
  fetchNewToken: () => Promise<string>,
) {
  const provider: Provider = {
    /**
     * Retrieves the access token.
     * @returns A promise that resolves to the access token.
     */
    async getAccessToken() {
      return fetchNewToken();
    },

    /**
     * Retrieves the user accounts.
     * @returns An array of user accounts.
     */
    async getUserAccounts() {
      return [activeAccount];
    },
  };

  const verificationLevel: VerificationLevel = "Anti-Sybil";
  const theme: Theme = "dark";
  const loginMode: LoginMode = "wallet";

  const zkMeWidget = new ZkMeWidget(
    "M2024012969876367071371562763835",
    "World Association",
    "0x2105",
    provider,
    {
      lv: verificationLevel,
      theme: theme,
      mode: loginMode,
      checkAddress: false,
    },
  );

  zkMeWidget.launch();
}
