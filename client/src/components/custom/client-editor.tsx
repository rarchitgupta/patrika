"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "@/components/editor/advanced-editor";
import { EditorInstance, JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/app/default-value";
import { useDebouncedCallback } from "use-debounce";

export function ClientEditor() {
  const [value, setValue] = useState<JSONContent>(defaultValue);
  const debouncedUpdates = useDebouncedCallback(async (json: JSONContent) => {
    console.log("json", json);
  }, 500);
  return (
    <ScrollArea className="px-6 py-4 lg:px-24 flex-1 overflow-auto">
      <Editor onChange={debouncedUpdates} initialValue={value} />
    </ScrollArea>
  );
}
