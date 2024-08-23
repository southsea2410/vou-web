import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import httpClient from "../httpClient";

async function deleteVoucher(id: string) {
  const res = await httpClient.delete(`/items/${id}`);
  return res.data;
}

export default function useDeleteVoucher(
  opts?: Omit<UseMutationOptions<unknown, Error, string>, "mutationFn">,
) {
  return useMutation<unknown, Error, string>({ ...opts, mutationFn: deleteVoucher });
}
