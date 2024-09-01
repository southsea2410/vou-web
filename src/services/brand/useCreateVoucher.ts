import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { VoucherNoId } from "../types";
import httpClient from "../httpClient";

async function createVoucher(voucher: VoucherNoId) {
  const res = await httpClient.post("events/api/vouchers", voucher);
  return res.data;
}

export default function useCreateVoucher(
  opts?: Omit<UseMutationOptions<object, Error, VoucherNoId>, "mutationFn">,
) {
  return useMutation<object, Error, VoucherNoId>({ ...opts, mutationFn: createVoucher });
}
