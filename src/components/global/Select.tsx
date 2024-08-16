"use client";

import {
  Select as RadixSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOptionType = {
  value: string;
  label: string;
};

type SelectFormProps = {
  data: SelectOptionType[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function Select({
  data,
  onChange,
  placeholder = "Select an option",
  className,
}: SelectFormProps) {
  return (
    <div className={className}>
      <RadixSelect onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </RadixSelect>
    </div>
  );
}
