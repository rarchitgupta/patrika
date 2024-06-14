import { Loader, CircleCheck, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/appStore";

export function EditorStatus() {
  const { editorState, aiGenerateLoading } = useAppStore();
  return (
    <div className="flex flex-row items-center justify-between mt-8">
      <div className="flex flex-row items-center gap-4">
        <Badge
          variant="outline"
          className="flex flex-row items-center justify-between gap-2"
        >
          <div>{editorState == "editing" ? "Draft" : "Saved"}</div>
          {editorState == "editing" ? (
            <CircleDashed size={15} />
          ) : (
            <CircleCheck color={"#10b981"} size={15} />
          )}
        </Badge>
      </div>
      {aiGenerateLoading && (
        <div className="flex flex-row items-center gap-4">
          Generating <Loader className="animate-spin" />
        </div>
      )}
    </div>
  );
}
