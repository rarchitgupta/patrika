"use client";
import { AiDialogInput } from "@/components/custom/dialogs/ai-dialog-input";
import { ClientEditor } from "@/components/custom/client-editor";
import { DatePicker } from "@/components/custom/date-picker";
import { EditorStatus } from "@/components/custom/editor-status";
import { OpenAIKeyInput } from "@/components/custom/dialogs/openai-api-key";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { AppLayout } from "@/components/custom/app-layout";
export default function Dashboard() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex flex-1 flex-col gap-4 lg:gap-4 h-screen">
          <div className="px-6 py-4 lg:px-24 lg:pt-16 flex flex-col justify-center">
            <div className="flex flex-col gap-8 justify-between md:flex-row md:items-center">
              <h1 className="text-lg font-semibold md:text-2xl">{`New Document`}</h1>
              <DatePicker />
            </div>
            <EditorStatus />
          </div>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col">
              <ClientEditor />
              <AiDialogInput />
              <OpenAIKeyInput />
            </div>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
