import { Day, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Path, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { vi } from "date-fns/locale";

type DatePickerFormProps<T extends object> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabledFn?: (date: Date) => boolean;
  required?: boolean;
};

export default function DatePickerForm<T extends object>({
  form,
  name,
  label,
  placeholder = "Choose a date",
  disabledFn = (date) => date < new Date(),
  required = false,
}: DatePickerFormProps<T>) {
  const handleDateChange = (date: Date | undefined) => {
    date && form.setValue(name, new Date(date) as never);
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? format(field.value, "PPP") : <span>{placeholder}</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                mode="single"
                locale={vi}
                selected={field.value}
                onSelect={handleDateChange}
                disabled={disabledFn}
                initialFocus
                required={required}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
