import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import brandHttpClient from "./httpClient";

async function deleteVoucher(id: string) {
  const res = await brandHttpClient.delete(`/items/${id}`);
  return res.data;
}

export default function useDeleteVoucher(
  opts?: Omit<UseMutationOptions<unknown, Error, string>, "mutationFn">,
) {
  return useMutation<unknown, Error, string>({ ...opts, mutationFn: deleteVoucher });
}
