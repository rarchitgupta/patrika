import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/authStore";

export const useDeleteSource = () => {
  const { user } = useAuthStore();
  const mutation = useMutation({
    mutationFn: async (id: number) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      let openaiApiKey: string | null = null;
      if (typeof window !== "undefined") {
        openaiApiKey = window.localStorage.getItem("openaikey");
      }
      if (!openaiApiKey) throw new Error("OpenAI API key not found");
      const token = await user.getIdToken();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/sources/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": openaiApiKey,
          },
        }
      );
      return response.data;
    },
  });
  return mutation;
};
