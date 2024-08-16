import { Plus, Trash } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetItems from "@/services/brand/useGetItems";
import { EventFormData } from "@/services/brand/formSchemas";
import { Select } from "@/components/global/Select";

type CreateVoucherItemInputProps = {
  form: UseFormReturn<EventFormData>;
  voucherIndex: number;
};

export default function CreateVoucherItemInput({
  form,
  voucherIndex,
}: CreateVoucherItemInputProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `listVoucher_Items.${voucherIndex}.itemIds_quantities`,
  });

  const { data: items } = useGetItems("items");

  const handleItemChange = (itemId: string, index: number) => {
    form.setValue(`listVoucher_Items.${voucherIndex}.itemIds_quantities.${index}.itemId`, itemId);
  };

  const itemSelectData = items?.map((item) => ({
    value: item.id,
    label: item.name,
  })) as [{ value: string; label: string }];

  return (
    <div>
      <Button
        className="mb-1"
        size="icon"
        type="button"
        onClick={() => append({ itemId: "", quantity: 0 })}
      >
        <Plus />
      </Button>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="mb-1.5 flex gap-2">
            {!!itemSelectData && (
              <Select
                className="basis-2/3"
                placeholder="Select item"
                onChange={(itemId) => handleItemChange(itemId, index)}
                data={itemSelectData}
              />
            )}
            <Input
              className="basis-1/6"
              type="number"
              min={0}
              {...form.register(
                `listVoucher_Items.${voucherIndex}.itemIds_quantities.${index}.quantity`,
              )}
              placeholder="100"
            />
            <div className="basis-1/6">
              <Button
                size="icon"
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="aspect-square"
              >
                <Trash />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
