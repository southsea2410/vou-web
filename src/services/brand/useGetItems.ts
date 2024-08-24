"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Item } from "../types";
import httpClient from "../httpClient";

async function getItems(brand_id: string) {
  const res = await httpClient.get("api/v1/events/api/items/brands/" + brand_id);
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetItems(brand_id: string, opts?: UseQueryOptionsOmitted<Item[]>) {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => getItems(brand_id),
    ...opts,
  });
}
