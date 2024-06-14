"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppStore } from "@/store/appStore";

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length === 1 && files[0] instanceof File, {
      message: "A single file is required",
    }),
});

function FileUpload({
  onSubmitHandler,
}: {
  onSubmitHandler: (data: z.infer<typeof formSchema>) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const {
    isFileUploadDialogOpen,
    closeFileUploadDialog,
    openFileUploadDialog,
  } = useAppStore();
  const fileRef = form.register("file");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (onSubmitHandler) {
      onSubmitHandler(data);
    } else {
      console.log(data);
    }
  };

  function onOpenChange() {
    if (isFileUploadDialogOpen) {
      closeFileUploadDialog();
    } else {
      openFileUploadDialog();
    }
  }

  return (
    <Dialog open={isFileUploadDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Upload Source</DialogTitle>
          <DialogDescription>
            Add additional files to your context
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="shadcn"
                        {...fileRef}
                        accept="application/pdf"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.file?.message}
                    </FormMessage>
                  </FormItem>
                );
              }}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default FileUpload;
