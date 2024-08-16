import { Column } from "@tanstack/react-table";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import DebouncedInput from "./DebounceInput";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/global/Multiselect";

type FilterProps<T> = {
  column: Column<T, unknown>;
};

export function Filter<T>({ column }: FilterProps<T>) {
  const handleChange = useCallback(
    (value: string | ChangeEvent<HTMLInputElement>) => {
      column.setFilterValue(value);
    },
    [column],
  );

  return (
    <DebouncedInput
      type="text"
      autoComplete="off"
      onChange={handleChange}
      list={column.id + "list"}
    />
  );
}

type SelectFilterProps<T> = {
  column: Column<T, unknown>;
  options: string[];
};

export function SelectFilter<T>({ column, options }: SelectFilterProps<T>) {
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    column.setFilterValue(value);
  }, [value, column]);
  return (
    <MultiSelector values={value} onValuesChange={setValue} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="..." />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((value) => (
            <MultiSelectorItem key={value} value={value}>
              {value}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
