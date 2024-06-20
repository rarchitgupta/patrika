import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { useUpdateDocument } from "@/api/update-document";
import { toast } from "sonner";

export function EditableTitle({
  title,
  setTitle,
  documentId,
}: {
  title: string | undefined;
  setTitle: Dispatch<SetStateAction<string>>;
  documentId: number;
}) {
  const { mutate: updateDocumentMutate } = useUpdateDocument();
  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }
  function handleBlur() {
    if (!title) {
      setTitle("Untitled");
    }
    handleTitleUpdate();
  }

  function handleTitleUpdate() {
    updateDocumentMutate(
      { id: documentId, name: title },
      {
        onSuccess: () => {},
        onError: (e) => {
          toast.error("Error while saving document");
        },
      }
    );
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="px-0 py-0">
          <h1 className="text-xl font-semibold md:text-3xl">{title}</h1>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <Input onChange={handleTitleChange} value={title} onBlur={handleBlur} />
      </PopoverContent>
    </Popover>
  );
}
