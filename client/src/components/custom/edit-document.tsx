import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function EditDocument({ documentId }: { documentId: number }) {
  const router = useRouter();
  function handleClick() {
    router.push(`/${documentId}`);
  }
  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleClick}>
      <Pencil />
    </Button>
  );
}
