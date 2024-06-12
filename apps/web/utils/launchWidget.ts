import {
  LoginMode,
  Provider,
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
  fetchNewToken: () => Promise<string>
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

  const loginMode: LoginMode = "wallet";

  const zkMeWidget = new ZkMeWidget(
    "M2024053066119595336406774111128",
    "World Association",
    "0x2105",
    provider,
    {
      lv: verificationLevel,
      mode: loginMode,
    }
  );

  zkMeWidget.launch();
}
