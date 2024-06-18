import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { JSONContent } from "novel";

export const useUpdateDocument = () => {
  const { user } = useAuthStore();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      name,
      json_content,
      date,
    }: {
      id: number;
      name?: string;
      json_content?: JSONContent;
      date?: Date;
    }) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const token = await user.getIdToken();
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
        {
          name,
          json_content,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });

  return mutation;
};
