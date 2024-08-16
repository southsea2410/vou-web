import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FieldValue, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type DatePickerFormProps<T extends object> = {
  form: UseFormReturn<T>;
  name: FieldValue<T>;
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
  const ref = useRef<HTMLDivElement>(null);
  return (
    <FormField
      control={form.control}
      name={name as never}
      render={({ field }) => (
        <FormItem className="flex flex-col" ref={ref}>
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
            <PopoverContent className="w-auto p-0" align="start" containerRef={ref}>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
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
