import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Item } from "../types";
import brandHttpClient from "./httpClient";

async function getItems() {
  const res = await brandHttpClient.get("/items");
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetItems({ ...opts }: UseQueryOptionsOmitted<Item[]>) {
  return useQuery<Item[]>({ queryKey: ["items"], queryFn: getItems, ...opts });
}
