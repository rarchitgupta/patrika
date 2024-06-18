import { Header } from "@/components/custom/header";
import { SearchX } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
export default function Page404() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col p-6 max-w-7xl w-full gap-6 rounded-md bg-card flex-grow">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="flex gap-4 m-8 items-center">
            <SearchX size={80} />
            <h1 className="text-7xl font-bold md:text-9xl">404</h1>
          </div>
          <p className="text-lg">
            Wandered too far? Go{" "}
            <Link href="/" className="underline">
              back
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
