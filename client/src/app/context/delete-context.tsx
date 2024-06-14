"use client";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { Row } from "@tanstack/react-table";
import { Source } from "./columns";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteSource } from "@/api/delete-source";
import { Switch } from "@/components/ui/switch";
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

export function DeleteContext({ row }: { row: Row<Source> }) {
  const queryClient = useQueryClient();
  const { mutate: useDeleteSourceMutate } = useDeleteSource();

  const deleteSource = useDebouncedCallback(() => {
    const id = row.getValue("id");
    const uploadPromise = () => {
      return new Promise((resolve, reject) => {
        if (typeof id === "number") {
          useDeleteSourceMutate(id, {
            onSuccess: (data) => {
              queryClient.invalidateQueries({
                queryKey: ["sources"],
                exact: true,
              });
              resolve(data);
            },
            onError: (e) => {
              reject(e);
            },
          });
        }
      });
    };
    toast.promise(uploadPromise(), {
      loading: "Deleting...",
      success: "Context deleted successfully",
      error: "Context deletion failed",
    });
  }, 300);

  return (
    <div className="flex flex-row items-center gap-8">
      {/* <Switch /> - Pending implementation of instant context toggle */}
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
              This will permanently delete your source{" "}
              <span className="font-medium text-black">
                {row.getValue("source_name")}
              </span>{" "}
              and remove its data from your context and our servers
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
