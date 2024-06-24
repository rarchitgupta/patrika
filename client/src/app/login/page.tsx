"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa6";
import useAuthStore from "@/store/authStore";
import { Header } from "@/components/custom/header";
import { useRouter } from "next/navigation";

export default function Login() {
  const googleLogin = useAuthStore((state) => state.googleLogin);
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  const router = useRouter();

  if (!(!loading && !user)) {
    router.push("/");
  }
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex flex-col p-6 max-w-7xl w-full gap-6 rounded-md bg-card min-h-screen">
        <Header />
        <div className="flex flex-col items-center gap-2 justify-center flex-grow">
          <h1 className="text-3xl font-medium">Login</h1>
          <p className="text-balance text-muted-foreground">
            Get started below
          </p>
          <div className="grid gap-4 w-full md:w-[400px] mt-10">
            <Button
              variant="outline"
              className="md:w-full gap-2"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
              <div>Sign in with Google</div>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
