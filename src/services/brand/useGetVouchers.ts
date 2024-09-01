"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Item, Voucher } from "../types";
import httpClient from "../httpClient";

async function getVouchers(brand_id: string) {
  const res = await httpClient.get("events/api/vouchers/brands/" + brand_id);
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetVouchers(brand_id: string, opts?: UseQueryOptionsOmitted<Voucher[]>) {
  return useQuery<Voucher[]>({
    queryKey: ["vouchers", "brand", brand_id],
    queryFn: () => getVouchers(brand_id),
    ...opts,
  });
}
