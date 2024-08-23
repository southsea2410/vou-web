import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Item } from "../types";
import httpClient from "../httpClient";

async function createItem(item: Item) {
  const res = await httpClient.post("/items", item);
  return res.data;
}

export default function useCreateEvent(opts?: UseMutationOptions<object, Error, Item>) {
  return useMutation<object, Error, Item>({ ...opts, mutationFn: createItem });
}
