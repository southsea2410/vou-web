import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Item } from "../types";
import httpClient from "../httpClient";

async function updateEvent(newItem: Item) {
  const res = await httpClient.put(`events/api/items`, newItem);
  return res.data;
}

export default function useUpdateItem(
  opts?: Omit<UseMutationOptions<object, Error, Item>, "mutationFn">,
) {
  return useMutation<object, Error, Item>({
    ...opts,
    mutationFn: updateEvent,
  });
}
