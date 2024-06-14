import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/store/authStore";

export const useGetSources = () => {
  const { user } = useAuthStore();

  const query = useQuery({
    queryKey: ["sources"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      const token = await user.getIdToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/sources`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!user, // Ensure the query runs only if the user is available
  });

  return query;
};
