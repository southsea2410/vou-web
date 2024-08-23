import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import httpClient from "../httpClient";
import { Voucher } from "../types";
import mockVouchers from "../mocks/mockVouchers";

async function getVouchers() {
  const res = await httpClient.get("/vouchers");
  return res.data;
}

export default function useGetVouchers(opts?: UseQueryOptions<Voucher[]>) {
  return useQuery<Voucher[]>({
    ...opts,
    queryKey: ["vouchers"],
    queryFn: getVouchers,
    initialData: mockVouchers,
  });
}
