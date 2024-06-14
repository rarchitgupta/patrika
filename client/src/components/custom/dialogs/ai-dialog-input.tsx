import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStore } from "@/store/appStore";
import useAuthStore from "@/store/authStore";
import { getRemoteChain } from "@/lib/langchain";

const formSchema = z.object({
  query: z.string({ required_error: "Query is required" }),
});

export function AiDialogInput() {
  const {
    isAiDialogOpen,
    closeAiDialog,
    editor,
    openAiDialog,
    setAiGenerateLoading,
  } = useAppStore();
  const { user } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.query.length > 0) {
      setAiGenerateLoading(true);
      const user_id = await user?.getIdToken();
      const remoteChain = getRemoteChain(user_id);
      closeAiDialog();
      const stream = await remoteChain.stream(values.query);
      let accumulatedResponse = "";
      for await (const chunk of stream) {
        if (typeof chunk == "string") {
          accumulatedResponse += chunk;
        }
      }
      editor?.commands.insertContent(accumulatedResponse);
      setAiGenerateLoading(false);
    }
  }

  function onOpenChange() {
    if (isAiDialogOpen) {
      closeAiDialog();
    } else {
      openAiDialog;
    }
  }

  return (
    <Dialog open={isAiDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Ask AI</DialogTitle>
          <DialogDescription>
            Generate notes based on your question
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
