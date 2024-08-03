import { useForm } from "react-hook-form";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Item } from "@/services/types";
import { DialogTrigger } from "@radix-ui/react-dialog";

type CreateItemFormProps = Omit<Item, "icon">;

export default function CreateItemDialog() {
  const form = useForm<CreateItemFormProps>();
  const handleSubmit = form.handleSubmit((data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <LabelledInput {...form.register("name")} label="Item name" />
            <div>
              <Label className="mb-1.5">Item description</Label>
              <Textarea {...form.register("description")} />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
