import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export function EditableTitle({
  title,
  setTitle,
}: {
  title: string | undefined;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  function handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
    if (!title) {
      setTitle("Untitled");
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="px-0 py-0">
          <h1 className="text-xl font-semibold md:text-3xl">{title}</h1>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <Input onChange={handleTitleChange} value={title} />
      </PopoverContent>
    </Popover>
  );
}
