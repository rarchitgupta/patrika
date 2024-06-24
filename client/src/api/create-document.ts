import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/authStore";

export const useCreateDocument = () => {
  const { user } = useAuthStore();
  const mutation = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const token = await user.getIdToken();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/documents`,
        {
          name: name,
          json_content: {},
          date: new Date(),
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
