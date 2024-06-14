import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);
  if (loading || !user) {
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Loader size={50} className="animate-spin" />
    </div>;
  }
  return <>{children}</>;
};
