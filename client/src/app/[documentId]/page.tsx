"use client";
import { useEffect, useState } from "react";
import { useGetDocument } from "@/api/get-document";
import { AiDialogInput } from "@/components/custom/dialogs/ai-dialog-input";
import { ClientEditor } from "@/components/custom/client-editor";
import { DatePicker } from "@/components/custom/date-picker";
import { EditorStatus } from "@/components/custom/editor-status";
import { OpenAIKeyInput } from "@/components/custom/dialogs/openai-api-key";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { AppLayout } from "@/components/custom/app-layout";
import { EditableTitle } from "@/components/custom/editable-title";
import { SkeletonDocument } from "@/components/custom/skeletons/skeleton-document";
import { useUpdateDocument } from "@/api/update-document";
import { JSONContent } from "novel";
import { toast } from "sonner";

export default function Document({
  params,
}: {
  params: { documentId: number };
}) {
  const {
    data: documentData,
    isLoading: documentLoading,
    error,
  } = useGetDocument(params.documentId);
  const { mutate: updateDocumentMutate } = useUpdateDocument();
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState<string>("Untitled");
  useEffect(() => {
    if (documentData && !documentLoading) {
      setTitle(documentData.name);
      setDate(new Date(documentData.date));
    }
  }, [documentLoading, documentData]);

  function handleContentUpdate(json: JSONContent) {
    updateDocumentMutate(
      { id: params.documentId, json_content: json },
      {
        onSuccess: () => {},
        onError: (e) => {
          toast.error("Error while saving document");
        },
      }
    );
  }
  if (documentLoading || !documentData) {
    return (
      <ProtectedRoute>
        <AppLayout>
          <SkeletonDocument />
        </AppLayout>
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex flex-1 flex-col gap-4 lg:gap-4 h-screen">
          <div className="px-6 py-4 lg:px-24 lg:pt-16 flex flex-col justify-center">
            <div className="flex flex-col gap-8 justify-between md:flex-row md:items-center">
              <EditableTitle title={title} setTitle={setTitle} />
              {/* <DatePicker date={date} setDate={setDate} /> */}
            </div>
            <EditorStatus />
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col">
              <ClientEditor
                initialValue={documentData?.json_content}
                handleContentUpdate={handleContentUpdate}
              />
              <AiDialogInput />
              <OpenAIKeyInput />
            </div>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
