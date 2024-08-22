import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import brandHttpClient from "./httpClient";

async function deleteEvent(eventId: string) {
  const res = await brandHttpClient.delete(`/events/${eventId}`);
  return res.data;
}

export default function useDeleteEvent(
  opts?: Omit<UseMutationOptions<object, Error, string>, "mutationFn">,
) {
  return useMutation<object, Error, string>({
    ...opts,
    mutationFn: deleteEvent,
  });
}
