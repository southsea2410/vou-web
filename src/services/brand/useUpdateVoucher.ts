import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Voucher } from "../types";
import brandHttpClient from "./httpClient";

async function updateVoucher(newVoucher: Voucher) {
  const res = await brandHttpClient.patch(`/events/${newVoucher.id}`, newVoucher);
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
