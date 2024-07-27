import { useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { CreateVoucherForm } from "./CreateVoucherInner";

export type CreateItemsForm = {
  items: {
    name: string;
    description: string;
  }[];
};

export default function CreateItemsInner({
  form,
  voucherForm,
}: {
  form: UseFormReturn<CreateItemsForm>;
  voucherForm: UseFormReturn<CreateVoucherForm>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  useEffect(() => {
    voucherForm.watch("vouchers");
  }, []);

  return <div></div>;
}
