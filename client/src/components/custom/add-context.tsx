import { useAppStore } from "@/store/appStore";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddContext(): ReactNode {
  const { openFileUploadDialog } = useAppStore();
  return (
    <Button
      className="items-center"
      variant={"outline"}
      onClick={openFileUploadDialog}
    >
      <Plus size={20} className="mr-2" />
      Context
    </Button>
  );
}
