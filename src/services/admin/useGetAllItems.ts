"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Item } from "../types";
import httpClient from "../httpClient";

async function getItems() {
  const res = await httpClient.get("events/api/items");
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetAllItems(opts?: UseQueryOptionsOmitted<Item[]>) {
  return useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: getItems,
    ...opts,
  });
}
