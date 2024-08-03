import { CreateVoucherForm } from "@/app/brand/_components/CreateVoucherInner";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import brandHttpClient from "./httpClient";

type CreateVoucherRequest = {
  vouchers: CreateVoucherForm[];
};

async function createVoucher({ vouchers }: CreateVoucherRequest) {
  const res = await brandHttpClient.post("/vouchers", { vouchers });
  return res.data;
}

export default function useCreateEvent(
  opts?: UseMutationOptions<object, Error, CreateVoucherRequest>,
) {
  return useMutation<object, Error, CreateVoucherRequest>({ mutationFn: createVoucher, ...opts });
}
