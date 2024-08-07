import { CheckIcon, ChevronsUpDown, Plus, Trash } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useGetItems from "@/services/brand/useGetItems";
import { useQuery } from "@tanstack/react-query";

import { CreateVoucherForm } from "./CreateVoucherInner";

type CreateVoucherItemInputProps = {
  form: UseFormReturn<CreateVoucherForm>;
  voucherIndex: number;
};

export default function CreateVoucherItemInput({
  form,
  voucherIndex,
}: CreateVoucherItemInputProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `vouchers.${voucherIndex}.items`,
  });

  const { data: items } = useGetItems("items");

  return (
    <div>
      {fields.map((field, index) => {
        console.log(field, index);
        return (
          <div key={field.id} className="flex gap-2">
            <div className="grow" />
            <FormField
              control={form.control}
              name={`vouchers.${voucherIndex}.items.${index}.item_id`}
              render={({ field }) => {
                console.log(`vouchers.${voucherIndex}.items.${index}.item_id`, field.value);
                return (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? items?.find((i) => i.id === field.value)?.name
                              : "Chọn vật phẩm"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Tìm kiếm..." className="h-9" />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {items?.map((i) => (
                                <CommandItem
                                  value={i.name}
                                  key={i.id}
                                  onSelect={() => {
                                    form.setValue(
                                      `vouchers.${voucherIndex}.items.${index}.item_id`,
                                      i.id,
                                    );
                                    console.log("selected", i);
                                  }}
                                >
                                  {i.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      i.name === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                );
              }}
            />
            <Input
              className="w-20"
              {...form.register(`vouchers.${voucherIndex}.items.${index}.item_quantity`)}
              placeholder="100"
            />
            <Button
              size="icon"
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="aspect-square"
            >
              <Trash />
            </Button>
            <Button
              size="icon"
              type="button"
              onClick={() => append({ item_id: "", item_quantity: 0 })}
            >
              <Plus />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
