"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import DatePickerForm from "@/components/global/DatePickerForm";
import LabelledInput from "@/components/global/LabelledInput";
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
import { generateQR } from "@/lib/utils";
import { useAuth } from "@/providers/ClientAuthProvider";
import useCreateVoucher from "@/services/brand/useCreateVoucher";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import { Voucher, VoucherUnitValue } from "@/services/types";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";

type CreateVoucherFormProps = Omit<Voucher, "id" | "image"> & { image: FileList };

export default function CreateVoucherDialog() {
  const queryClient = useQueryClient();

  const form = useForm<CreateVoucherFormProps>();

  const uploadedImage = form.watch("image");

  const imgUri = useMemo(() => {
    if (!!uploadedImage) if (uploadedImage[0]) return URL.createObjectURL(uploadedImage[0]);
    return null;
  }, [uploadedImage]);

  const { upload, uploadKey } = useUpload();
  const { upload: uploadQR, uploadKey: uploadQRKey } = useUpload();

  const [disabledSubmit, setDisableSubmit] = useState(false);

  const { mutate: createVoucher } = useCreateVoucher({
    onSuccess(data) {
      toast({
        title: "Voucher created successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
    },
    onError(err) {
      toast({ title: "Failed to create voucher", description: err.message });
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    form.trigger().then((isValid) => {
      if (!isValid) return;

      setDisableSubmit(true);

      upload(data.image[0]);

      generateQR(data.qrCode)
        .then((file) => uploadQR(file))
        .catch((err) => console.log(err));
    });
  });

  const { accountId } = useAuth();

  const { data: brandInfo, isSuccess: isBrandInfoSuccess } = useGetProfileByAccountId(accountId, {
    enabled: !!accountId,
  });

  useEffect(() => {
    if (isBrandInfoSuccess) {
      form.setValue("brand_id", brandInfo?.id);
      setDisableSubmit(false);
    } else setDisableSubmit(true);
  }, [brandInfo, form, isBrandInfoSuccess]);

  // effect submit form once complete uploading 2 files
  useEffect(() => {
    if (uploadKey && uploadQRKey) {
      const handleSubmitForm = async (key: string, qrKey: string) => {
        const data = form.getValues();

        const voucher = {
          ...data,
          image: key,
          qrCode: qrKey,
        };

        setDisableSubmit(false);
        createVoucher(voucher);
      };

      handleSubmitForm(uploadKey, uploadQRKey);
    }
  }, [uploadKey, uploadQRKey, brandInfo?.id, createVoucher, form]);

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
      <DialogContent className="max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Voucher</DialogTitle>
          <DialogDescription>Create a voucher for later uses in events</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex h-full flex-col gap-2">
            <LabelledInput
              {...form.register("voucherCode", { required: true })}
              label="Voucher Code"
            />
            <LabelledInput {...form.register("qrCode")} label="QR Code" />
            <LabelledInput
              {...form.register("image", { required: true })}
              label="Image"
              type="file"
            />
            <div className="relative aspect-[2/1] w-full">
              {!!imgUri && <Image fill src={imgUri} alt="Voucher image" className="object-cover" />}
            </div>
            <div>
              <Label className="mb-1.5">Voucher description</Label>
              <Textarea {...form.register("description", { required: true })} />
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
              {...form.register("value", { required: true })}
              type="number"
              label="Value"
              required
            />
            <div>
              <Label className="mb-1.5">Expire date</Label>
              <DatePickerForm form={form} name={"expiredDate"} required />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={disabledSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
