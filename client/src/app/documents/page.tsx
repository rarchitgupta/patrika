"use client";

import { AppLayout } from "@/components/custom/app-layout";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { DataTable } from "./data-table";
import { columns, Document } from "./columns";
import { useGetAllDocuments } from "@/api/get-all-documents";
import { Button } from "@/components/ui/button";

export default function Context() {
  const { data: documents } = useGetAllDocuments();
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
                children={<Button>Create</Button>}
              />
            )}
          </div>
        </main>
      </AppLayout>
    </ProtectedRoute>
  );
}
