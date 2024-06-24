"use client";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { Row } from "@tanstack/react-table";
import { Document } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteDocument } from "@/api/delete-document";

export function DeleteDocument({ row }: { row: Row<Document> }) {
  const queryClient = useQueryClient();
  const { mutate: deleteDocumentMutate } = useDeleteDocument();

  const deleteSource = useDebouncedCallback(() => {
    const id = row.getValue("id");
    const deleteDocumentPromise = () => {
      return new Promise((resolve, reject) => {
        if (typeof id === "number") {
          deleteDocumentMutate(
            { id },
            {
              onSuccess: (data) => {
                queryClient.invalidateQueries({
                  queryKey: ["documents"],
                  exact: true,
                });
                resolve(data);
              },
              onError: (e) => {
                reject(e);
              },
            }
          );
        }
      });
    };
    toast.promise(deleteDocumentPromise(), {
      loading: "Deleting...",
      success: "Document deleted successfully",
      error: "Document deletion failed",
    });
  }, 300);

  return (
    <div className="flex flex-row items-center gap-8">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Trash size={20} className="text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your document{" "}
              <span className="font-medium text-black">
                {row.getValue("name")}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteSource}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
