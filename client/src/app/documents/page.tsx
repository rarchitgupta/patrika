"use client";

import { AppLayout } from "@/components/custom/app-layout";
import { ProtectedRoute } from "@/components/custom/protected-route";

export default function Context() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex flex-1 flex-col gap-4 lg:gap-4">
          {/* <div className="px-6 py-4 lg:px-24 lg:py-16 flex flex-col justify-center">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">{`New Document`}</h1>
        </div>
        <EditorStatus />
      </div>
      <div className="flex flex-1" x-chunk="dashboard-02-chunk-1">
        <div>
          <ClientEditor />
          <AiDialogInput />
          <OpenAIKeyInput />
        </div>
      </div> */}
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
