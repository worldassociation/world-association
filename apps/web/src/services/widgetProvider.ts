import { Provider, ZkMeWidget } from "@zkmelabs/widget"

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
      return fetchNewToken()
    },

    /**
     * Retrieves the user accounts.
     * @returns An array of user accounts.
     */
    async getUserAccounts() {
      return [activeAccount]
    },
  }

  const zkMeWidget = new ZkMeWidget(
    "M2024012969876367071371562763835",
    "World Association",
    "8453",
    provider,
    {
      lv: "Anti-Sybil",
      mode: "wallet",
    }
  )

  zkMeWidget.launch()
}
