"use client";

import { Input, InputProps } from "@/components/ui/input";
import { InputHTMLAttributes, useEffect, useState } from "react";

type DebouncedInputProps = InputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange: (value: string) => void;
    debounce?: number;
  };

export default function DebouncedInput({
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}
