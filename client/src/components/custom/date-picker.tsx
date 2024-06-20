"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateDocument } from "@/api/update-document";
import { toast } from "sonner";

export function DatePicker({
  date,
  setDate,
  documentId,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  documentId: number;
}) {
  const { mutate: updateDocumentMutate } = useUpdateDocument();
  function handleDateUpdate(selectedDate: Date | undefined) {
    if (selectedDate) {
      updateDocumentMutate(
        { id: documentId, date: selectedDate },
        {
          onSuccess: () => {},
          onError: (e) => {
            toast.error("Error while saving document");
          },
        }
      );
    }
  }

  function handleDateSelect(selectedDate: Date | undefined) {
    setDate(selectedDate);
    handleDateUpdate(selectedDate);
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Document Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
