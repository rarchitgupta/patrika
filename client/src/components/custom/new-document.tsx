import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import { useCreateDocument } from "@/api/create-document";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function NewDocument({
  createNewDocumentHandler,
}: {
  createNewDocumentHandler: () => void;
}) {
  return (
    <Button variant="outline" onClick={createNewDocumentHandler}>
      <NotebookPen size={20} className="mr-2" />
      Create
    </Button>
  );
}
