import { useForm } from "react-hook-form";

import LabelledInput from "@/components/global/LabelledInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Voucher, VoucherUnitValue } from "@/services/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Select } from "@/components/global/Select";
import DatePickerForm from "@/components/global/DatePickerForm";

type CreateVoucherFormProps = Omit<Voucher, "id">;

export default function CreateVoucherDialog() {
  const form = useForm<CreateVoucherFormProps>();

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

  const unitValueSelect = VoucherUnitValue.map((i) => {
    return { value: i, label: i };
  });

  const handleChangeUnitValue = (value: string) => {
    form.setValue("unitValue", value as never);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Voucher</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Item</DialogTitle>
          <DialogDescription>Create a voucher for later uses in events</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-2">
            <LabelledInput {...form.register("voucherCode")} label="Voucher Code" />
            <LabelledInput {...form.register("qrCode")} label="QR Code" />
            <div>
              <Label className="mb-1.5">Item description</Label>
              <Textarea {...form.register("description")} />
            </div>
            <div>
              <Label className="mb-1.5">Unit value</Label>
              <Select
                data={unitValueSelect}
                placeholder="Select..."
                onChange={handleChangeUnitValue}
              />
            </div>
            <LabelledInput {...form.register("value")} type="number" label="Value" />
            <div>
              <Label className="mb-1.5">Expire date</Label>
              <DatePickerForm form={form} name={"expiredDate"} />
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
