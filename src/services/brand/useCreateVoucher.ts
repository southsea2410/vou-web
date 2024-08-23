import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Voucher, VoucherNoId } from "../types";
import httpClient from "../httpClient";

async function createVoucher(voucher: VoucherNoId) {
  const res = await httpClient.post("/vouchers", voucher);
  return res.data;
}

export default function useCreateVoucher(
  opts?: Omit<UseMutationOptions<object, Error, Voucher>, "mutationFn">,
) {
  return useMutation<object, Error, Voucher>({ ...opts, mutationFn: createVoucher });
}
