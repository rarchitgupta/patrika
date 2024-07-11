import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { RunnableConfig } from "@langchain/core/runnables";

export const getRemoteChain: (
  user_id: string | undefined
) => RemoteRunnable<unknown, unknown, RunnableConfig> = (
  user_id: string | undefined
) => {
  return new RemoteRunnable({
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    options: {
      headers: {
        Authorization: `Bearer ${user_id}`,
      },
    },
  });
};
