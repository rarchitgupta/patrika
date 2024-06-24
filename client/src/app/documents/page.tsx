"use client";

import { AppLayout } from "@/components/custom/app-layout";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { DataTable } from "./data-table";
import { columns, Document } from "./columns";
import { useGetAllDocuments } from "@/api/get-all-documents";
import { NewDocument } from "@/components/custom/new-document";
import { useCreateDocument } from "@/api/create-document";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function Documents() {
  const { data: documents } = useGetAllDocuments();
  const { mutate: createDocumentMutate } = useCreateDocument();
  const router = useRouter();
  const queryClient = useQueryClient();
  function addNewDocument() {
    const createDocumentPromise = () => {
      return new Promise((resolve, reject) =>
        createDocumentMutate(
          { name: "Untitled" },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries({
                queryKey: ["documents"],
                exact: true,
              });
              router.push(`/${data.id}`);
              resolve(data);
            },
            onError: (error) => {
              toast.error(error.message);
              reject(error);
            },
          }
        )
      );
    };

    toast.promise(createDocumentPromise(), {
      loading: "Creating...",
      error: "Document creation failed",
    });
  }
  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex flex-1 flex-col gap-4 lg:gap-4">
          <div className="px-6 py-4 lg:px-24 lg:py-16 flex flex-col justify-center">
            <h1 className="text-lg font-semibold md:text-2xl">Documents</h1>
            {documents && (
              <DataTable
                columns={columns}
                data={documents}
                children={
                  <NewDocument createNewDocumentHandler={addNewDocument} />
                }
              />
            )}
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
