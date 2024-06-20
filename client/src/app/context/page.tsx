"use client";
import dynamic from "next/dynamic";
import { useGetSources } from "@/api/get-sources";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { AddContext } from "@/components/custom/add-context";
import { useUploadSource } from "@/api/upload-source";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { AppLayout } from "@/components/custom/app-layout";
const FileUpload = dynamic(
  () => import("@/components/custom/dialogs/file-upload"),
  {
    ssr: false,
  }
);
export default function Documents() {
  const { data: sources } = useGetSources();
  const queryClient = useQueryClient();
  const { mutate: useUploadSourceMutate } = useUploadSource();
  function uploadSource(data: { file: FileList }) {
    const uploadPromise = () => {
      return new Promise((resolve, reject) => {
        useUploadSourceMutate(
          { file: data.file[0] },
          {
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
          }
        );
      });
    };
    toast.promise(uploadPromise(), {
      loading: "Uploading...",
      success: "Context uploaded successfully",
      error: "Context upload failed",
    });
  }
  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex flex-1 flex-col gap-4 lg:gap-4">
          <div className="px-6 py-4 lg:px-24 lg:py-16 flex flex-col justify-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Context Management
            </h1>
            {sources && (
              <DataTable
                columns={columns}
                data={sources}
                children={<AddContext />}
              />
            )}
            <div className="mt-10">
              <FileUpload onSubmitHandler={uploadSource} />
            </div>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
