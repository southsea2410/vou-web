import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Voucher } from "../types";
import httpClient from "../httpClient";

async function updateVoucher(newVoucher: Voucher) {
  const res = await httpClient.put(`/events/api/vouchers`, newVoucher);
  return res.data;
}

export default function useUpdateVoucher(
  opts?: Omit<UseMutationOptions<object, Error, Voucher>, "mutationFn">,
) {
  return useMutation<object, Error, Voucher>({
    ...opts,
    mutationFn: updateVoucher,
  });
}
