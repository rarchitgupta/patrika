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
import { toast } from "sonner";

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

      try {
        const remoteChain = getRemoteChain(user_id);
        closeAiDialog();
        const response = await remoteChain.invoke(values.query);
        editor?.commands.insertContent(String(response));
        setAiGenerateLoading(false);
      } catch (error) {
        toast.error((error as Error).message);
        setAiGenerateLoading(false);
      }
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
                    <Input
                      {...field}
                      className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
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
