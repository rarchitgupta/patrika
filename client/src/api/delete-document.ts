import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/authStore";

export const useDeleteDocument = () => {
  const { user } = useAuthStore();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const token = await user.getIdToken();
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`,
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
