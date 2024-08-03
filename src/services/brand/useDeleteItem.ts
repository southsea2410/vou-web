import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import brandHttpClient from "./httpClient";

type DeleteItemRequest = {
  id: string;
};

async function deleteItem({ id }: DeleteItemRequest) {
  const res = await brandHttpClient.delete(`/items/${id}`);
  return res.data;
}

export default function useDeleteItem(
  opts?: UseMutationOptions<unknown, Error, DeleteItemRequest>,
) {
  return useMutation<unknown, Error, DeleteItemRequest>({ ...opts, mutationFn: deleteItem });
}
