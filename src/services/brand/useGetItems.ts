"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Item } from "../types";
import brandHttpClient from "./httpClient";
import mockItems from "../mocks/mockItems";

async function getItems(brand_id: string) {
  const res = await brandHttpClient.get("/items");
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetItems(brand_id: string, opts?: UseQueryOptionsOmitted<Item[]>) {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => getItems(brand_id),
    initialData: mockItems,
    ...opts,
  });
}
