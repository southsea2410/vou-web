import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import httpClient from "../httpClient";
import { Voucher } from "../types";

async function getAllVouchers() {
  const res = await httpClient.get("api/v1/events/api/vouchers");
  return res.data;
}

export default function useGetAllVouchers(opts?: UseQueryOptions<Voucher[]>) {
  return useQuery<Voucher[]>({
    ...opts,
    queryKey: ["vouchers"],
    queryFn: getAllVouchers,
  });
}
