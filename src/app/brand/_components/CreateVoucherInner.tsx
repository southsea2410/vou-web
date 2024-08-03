import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, CheckIcon, ChevronsUpDown, Gift, SortAsc, TrashIcon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ItemSelect, Voucher } from "@/services/types";

export type CreateVoucherForm = {
  vouchers: ({
    code: string;
    is_qr: boolean;
    expired_date: Date;
    item_id: string;
    item_quantity: number;
  } & Pick<Voucher, "description">)[];
};

const mockItems: ItemSelect[] = [
  {
    id: "1",
    name: "Ngọc rồng 4 sao",
  },
  {
    id: "2",
    name: "Ngọc rồng 5 sao",
  },
];

export default function CreateVoucherInner({ form }: { form: UseFormReturn<CreateVoucherForm> }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "vouchers",
  });

  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  return (
    <div>
      <Button
        type="button"
        onClick={() =>
          append({
            code: "",
            is_qr: false,
            description: "",
            expired_date: tommorow,
            item_id: "",
            item_quantity: 0,
          })
        }
        className="mb-2"
      >
        Thêm voucher
      </Button>
      <div className="flex items-start gap-4 font-medium">
        <p className="basis-8">STT</p>
        <p className="basis-28">Voucher QR?</p>
        <p className="basis-1/6">Mã voucher</p>
        <p className="basis-1/6">Ngày hết hạn</p>
        <p className="basis-1/4">Mô tả</p>
        <p className="basis-1/6">Hình voucher</p>
        <p className="basis-1/12">Xoá</p>
      </div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div key={field.id} className="flex items-start gap-4">
            <p className="mt-2 basis-8 text-base font-medium">{index + 1}.</p>
            <div className="mt-3 flex basis-28 items-center gap-1.5">
              <Checkbox {...form.register(`vouchers.${index}.is_qr`)} />
            </div>
            <Input
              placeholder="Mã voucher"
              {...form.register(`vouchers.${index}.code`)}
              className="basis-1/6"
            />
            <FormField
              control={form.control}
              name={`vouchers.${index}.expired_date`}
              render={({ field }) => (
                <FormItem className="flex shrink basis-1/6 flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "overflow-clip pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PP", { locale: vi })
                          ) : (
                            <span>Ngày hết hạn</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <Textarea
              {...form.register(`vouchers.${index}.description`)}
              className="basis-1/4"
              placeholder="Hoàn 30% tối đa 150k cho đơn từ 0đ"
            />
            <Input placeholder="Hình ảnh voucher" type="file" className="basis-1/6" />
            <div className="basis-1/12">
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
        </div>
      ))}
      <Separator className="my-2" />
      <p className="mb-2 text-xl font-bold">Vật phẩm</p>
      <div className="flex items-start gap-4 font-medium">
        <p className="basis-1/12">STT</p>
        <p className="basis-1/5">Tên vật phẩm</p>
        <p className="basis-1/6 text-wrap">Số lượng quy đổi</p>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex items-start gap-4 font-medium">
          <p className="basis-1/12">{index + 1}.</p>
          <FormField
            control={form.control}
            name={`vouchers.${index}.item_id`}
            render={({ field }) => (
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
                          ? mockItems.find((i) => i.name === field.value)?.name
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
                          {mockItems.map((i) => (
                            <CommandItem
                              value={i.name}
                              key={i.id}
                              onSelect={() => {
                                form.setValue(`vouchers.${index}.item_id`, i.id);
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
            )}
          />
          <Input type="number" className="basis-1/6" />
        </div>
      ))}
    </div>
  );
}
