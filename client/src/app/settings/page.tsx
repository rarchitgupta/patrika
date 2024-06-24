"use client";

import { AppLayout } from "@/components/custom/app-layout";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { OpenAIKeyForm } from "@/components/custom/openai-api-key-form";

export default function Settings() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <main className="flex flex-1 flex-col gap-4 lg:gap-4">
          <div className="px-6 py-4 lg:px-24 lg:py-16 flex flex-col justify-center">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
            </div>
            <div className="mt-8">
              <OpenAIKeyForm />
            </div>
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
