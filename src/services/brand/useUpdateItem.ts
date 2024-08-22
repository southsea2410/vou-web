import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Item } from "../types";
import brandHttpClient from "./httpClient";

async function updateEvent(newItem: Item) {
  const res = await brandHttpClient.patch(`/events/${newItem.id}`, newItem);
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
