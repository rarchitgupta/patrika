import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/authStore";

export const useUploadSource = () => {
  const { user } = useAuthStore();

  const mutation = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const openaiApiKey = window.localStorage.getItem("openaikey");
      if (!openaiApiKey) throw new Error("OpenAI API key not found");
      if (!user) throw new Error("User is not authenticated");
      const token = await user.getIdToken();
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sources`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "x-api-key": openaiApiKey,
          },
        }
      );

      return response.data;
    },
  });

  return mutation;
};
