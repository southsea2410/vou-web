import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Item } from "../types";
import brandHttpClient from "./httpClient";

async function createItem(item: Item) {
  const res = await brandHttpClient.post("/items", item);
  return res.data;
}

export default function useCreateEvent(opts?: UseMutationOptions<object, Error, Item>) {
  return useMutation<object, Error, Item>({ ...opts, mutationFn: createItem });
}
