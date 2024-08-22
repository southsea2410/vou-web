"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import mockItems from "../mocks/mockItems";
import { Item } from "../types";
import brandHttpClient from "./httpClient";

async function getItems(brand_id: string) {
  const res = await brandHttpClient.get("/items" + brand_id);
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
