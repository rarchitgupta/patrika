import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { LoaderScreen } from "./loader-screen";

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
    <LoaderScreen />;
  }
  return <>{children}</>;
};
