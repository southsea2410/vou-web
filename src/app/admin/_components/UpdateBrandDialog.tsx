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
import useUpdateVoucher from "@/services/brand/useUpdateVoucher";
import useUpdateProfile from "@/services/identity/useUpdateProfile";
import { BrandProfile, DialogState, VoucherUnitValue } from "@/services/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type UpdateBrandFormProps = BrandProfile & { id: string };

type UpdateBrandDialogProps = {
  brand?: UpdateBrandFormProps;
  open: boolean;
  setState: (state: DialogState<BrandProfile>) => void;
};

export default function UpdateBrandDialog({ brand, open, setState }: UpdateBrandDialogProps) {
  const handleClose = () => setState({ open: false });

  const editForm = useForm<UpdateBrandFormProps>({ defaultValues: brand });

  useEffect(() => {
    open && brand && editForm.reset(brand);
  }, [open, editForm, brand]);

  const queryClient = useQueryClient();

  const { mutate: updateProfile } = useUpdateProfile({
    onSuccess(data, variables, context) {
      toast({
        title: "Brand updated successfully",
      });

      setState({ open: false });
      queryClient.invalidateQueries({ queryKey: ["admin_all_accounts"] });
    },
    onError(err) {
      toast({ title: "Failed to update Brand", description: err.message });
    },
  });

  const handleSubmitForm = async () => {
    const data = editForm.getValues();
    brand?.id && updateProfile({ userId: brand?.id, newProfile: data });
  };

  const unitValueSelect = VoucherUnitValue.map((i) => {
    return { value: i, label: i };
  });

  return (
    <Dialog open={open} onOpenChange={(s) => !s && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
          <DialogDescription>{brand?.fullName}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Form {...editForm}>
            <form className="flex h-full flex-col gap-2">
              <p>General information</p>
              <LabelledInput
                {...editForm.register("fullName", { required: true })}
                label="Full name"
              />
              <LabelledInput
                {...editForm.register("username", { required: true })}
                label="Username"
              />
              <LabelledInput {...editForm.register("email", { required: true })} label="Email" />
              <LabelledInput {...editForm.register("email", { required: true })} label="Phone" />
              <LabelledInput
                {...editForm.register("image", { required: true })}
                label="Image"
                type="file"
              />
              <div className="relative aspect-[2/1] w-full">
                {newImgUrl ? (
                  <img src={newImgUrl} alt="icon" />
                ) : (
                  !!brand?.image && <S3Image k={brand.image} alt="icon" width={460} height={230} />
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
          <Button onClick={handleSubmitForm}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
