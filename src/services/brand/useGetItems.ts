import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Item } from "../types";
import brandHttpClient from "./httpClient";

async function getItems() {
  const res = await brandHttpClient.get("/items");
  return res.data;
}

type UseQueryOptionsWithoutQueryKey<T> = Omit<UseQueryOptions<T>, "queryKey">;

export default function useGetItems({
  queryKey = ["items"],
  queryFn = getItems,
  ...opts
}: UseQueryOptionsWithoutQueryKey<Item[]>) {
  return useQuery<Item[]>({ queryKey, queryFn, ...opts });
}
