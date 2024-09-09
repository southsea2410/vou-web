import DatePickerForm from "@/components/global/DatePickerForm";
import LabelledInput from "@/components/global/LabelledInput";
import S3Image from "@/components/global/S3Image";
import { Select } from "@/components/global/Select";
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
import { useUpload } from "@/hooks/useUpload";
import useUpdateVoucher from "@/services/brand/useUpdateVoucher";
import { DialogState, Voucher, VoucherUnitValue } from "@/services/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

type UpdateVoucherDialogProps = {
  item?: Voucher;
  open: boolean;
  setState: (state: DialogState<Voucher>) => void;
};

type UpdateVoucherForm = Voucher & { newImage: FileList };

export default function UpdateVoucherDialog({ item, open, setState }: UpdateVoucherDialogProps) {
  const handleClose = () => setState({ open: false });

  const editForm = useForm<UpdateVoucherForm>({ defaultValues: item });

  useEffect(() => {
    open && item && editForm.reset(item);
  }, [open, editForm, item]);

  const newImgFile = editForm.watch("newImage");
  const newImgUrl = useMemo(
    () => newImgFile && newImgFile.length && URL.createObjectURL(newImgFile[0]),
    [newImgFile],
  );

  const queryClient = useQueryClient();

  const { mutate: updateVoucher } = useUpdateVoucher({
    onSuccess(data, variables, context) {
      toast({
        title: "Voucher updated successfully",
      });

      setState({ open: false });
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError(err) {
      toast({ title: "Failed to update voucher", description: err.message });
    },
  });

  const { upload } = useUpload();

  const handleUpload = () => {
    if (!newImgFile) {
      handleSubmitForm(item?.image ?? "");
      return;
    }

    upload(newImgFile[0], (url) => handleSubmitForm(url));
  };

  const handleSubmitForm = async (newImage: string) => {
    const data = editForm.getValues();

    data.newImage = undefined as never;

    updateVoucher({ ...data, image: newImage });
  };

  const unitValueSelect = VoucherUnitValue.map((i) => {
    return { value: i, label: i };
  });

  const handleChangeUnitValue = (value: string) => {
    editForm.setValue("unitValue", value as never);
  };

  return (
    <Dialog open={open} onOpenChange={(s) => !s && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Voucher</DialogTitle>
          <DialogDescription>{item?.voucherCode}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...editForm}>
            <form className="flex h-full flex-col gap-2">
              <LabelledInput
                {...editForm.register("voucherCode", { required: true })}
                label="Voucher Code"
              />
              <LabelledInput {...editForm.register("qrCode")} label="QR Code" />
              <LabelledInput
                {...editForm.register("image", { required: true })}
                label="Image"
                type="file"
              />
              <div className="relative aspect-[2/1] w-full">
                {newImgUrl ? (
                  <img src={newImgUrl} alt="icon" />
                ) : (
                  !!item?.image && <S3Image k={item.image} alt="icon" width={460} height={230} />
                )}{" "}
              </div>
              <div>
                <Label className="mb-1.5">Voucher description</Label>
                <Textarea {...editForm.register("description", { required: true })} />
              </div>
              <div>
                <Label className="mb-1.5">Unit value</Label>
                <Select
                  data={unitValueSelect}
                  placeholder="Select..."
                  onChange={handleChangeUnitValue}
                />
              </div>
              <LabelledInput
                {...editForm.register("value", { required: true })}
                type="number"
                label="Value"
                required
              />
              <div>
                <Label className="mb-1.5">Expire date</Label>
                <DatePickerForm form={editForm} name={"expiredDate"} required />
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
