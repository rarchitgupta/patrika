"use client";
import { ProtectedRoute } from "@/components/custom/protected-route";
import { useEffect } from "react";
import { useGetLatestDocument } from "@/api/get-latest-document";
import { useRouter } from "next/navigation";
import { LoaderScreen } from "@/components/custom/loader-screen";
export default function Dashboard() {
  const router = useRouter();
  const { data: latestDocument, isLoading: latestDocumentLoading } =
    useGetLatestDocument();
  useEffect(() => {
    if (latestDocument) {
      router.push(`/${latestDocument.id}`);
    }
  }, [latestDocument]);
  if (latestDocumentLoading || !latestDocument) {
    return <LoaderScreen />;
  }

  return (
    <ProtectedRoute>
      <LoaderScreen />
    </ProtectedRoute>
  );
}
