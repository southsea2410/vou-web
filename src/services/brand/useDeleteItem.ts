import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import httpClient from "../httpClient";

async function deleteItem(itemId: string) {
  const res = await httpClient.delete(`api/v1/events/api/items/${itemId}`);
  return res.data;
}

export default function useDeleteItem(
  opts?: Omit<UseMutationOptions<unknown, Error, string>, "mutationFn">,
) {
  return useMutation<unknown, Error, string>({ ...opts, mutationFn: deleteItem });
}
