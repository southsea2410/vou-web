"use client";

import { TrashIcon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CreateVoucherItemInput from "./CreateVoucherItemInput";
import { EventFormData } from "@/services/brand/formSchemas";
import { Select } from "@/components/global/Select";
import { useMemo } from "react";
import useGetAllVouchers from "@/services/admin/useGetAllVouchers";
import { useAuth } from "@/providers/ClientAuthProvider";
import useGetProfileByAccountId from "@/services/brand/useGetProfileByAccountId";
import useGetVouchers from "@/services/brand/useGetVouchers";

export default function CreateVoucherInner({ form }: { form: UseFormReturn<EventFormData> }) {
  const { accountId } = useAuth();
  const { data: profile } = useGetProfileByAccountId(accountId, { enabled: !!accountId });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "listVoucher_Items",
  });

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  const { data: vouchers } = useGetVouchers(profile?.id ?? "", { enabled: !!profile?.id });

  const vouchersSelectData = useMemo(() => {
    if (!vouchers) return [];
    return vouchers.map((voucher) => ({
      value: voucher.id,
      label: voucher.voucherCode,
    })) as [{ value: string; label: string }];
  }, [vouchers]);

  const handleVoucherChange = (voucherId: string, index: number) => {
    form.setValue(`listVoucher_Items.${index}.voucherId`, voucherId);
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() =>
          append({
            voucherId: "1",
            quantityOfVoucher: 50,
            itemIds_quantities: [],
          })
        }
        className="mb-2"
      >
        Add
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-4 font-medium">
          <p className="basis-8">#</p>
          <p className="basis-2/3">Voucher</p>
          <p className="basis-1/6">Quantity</p>
          <p className="basis-1/6">Delete</p>
        </div>
        <div>Voucher - Item Exchange</div>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-3 grid grid-cols-2 gap-3 border-b border-b-gray-200 pb-3">
          <div className="flex items-start gap-4">
            <p className="mt-2 basis-8 text-base font-medium">{index + 1}.</p>
            <Select
              className="basis-2/3"
              data={vouchersSelectData}
              onChange={(v) => handleVoucherChange(v, index)}
            />
            <Input
              {...form.register(`listVoucher_Items.${index}.quantityOfVoucher`)}
              className="basis-1/6"
            />
            <div className="basis-1/6">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="aspect-square"
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
          <CreateVoucherItemInput form={form} voucherIndex={index} />
        </div>
      ))}
    </div>
  );
}
