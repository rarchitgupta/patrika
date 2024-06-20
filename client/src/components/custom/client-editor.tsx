"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useAppStore } from "@/store/appStore";

export function ClientEditor({
  initialValue,
  handleContentUpdate,
}: {
  initialValue: JSONContent;
  handleContentUpdate: (json: JSONContent) => void;
}) {
  const [value, setValue] = useState<JSONContent>(initialValue);
  const { setEditorState } = useAppStore();
  const debouncedUpdates = useDebouncedCallback(async (json: JSONContent) => {
    setEditorState("saved");
    setValue(json);
    handleContentUpdate(json);
  }, 500);
  return (
    <div className="px-6 py-4 lg:px-24 flex-1 overflow-auto">
      <Editor onChange={debouncedUpdates} initialValue={value} />
    </div>
  );
}
