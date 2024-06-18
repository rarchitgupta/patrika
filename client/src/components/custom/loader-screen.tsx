import { Loader } from "lucide-react";

export function LoaderScreen() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Loader size={50} className="animate-spin" />
    </div>
  );
}
