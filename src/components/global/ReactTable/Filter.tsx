import { Column } from "@tanstack/react-table";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import DebouncedInput from "./DebounceInput";

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
