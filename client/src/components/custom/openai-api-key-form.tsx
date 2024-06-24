import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  apiKey: z.string(),
});

export function OpenAIKeyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.apiKey.length > 0) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("openaikey", values.apiKey);
      }
      toast.success("API key saved");
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const apiKey = window.localStorage.getItem("openaikey");
      if (apiKey) form.setValue("apiKey", apiKey);
    }
  }, []);
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4">
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">OpenAI API Key</FormLabel>
                <FormDescription>
                  Patrika does not store your API key on the server, it is
                  stored in your browser itself
                </FormDescription>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
