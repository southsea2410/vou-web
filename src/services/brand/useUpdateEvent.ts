import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Event } from "../types";
import httpClient from "../httpClient";

async function updateEvent(newEvent: Event) {
  const res = await httpClient.patch(`/events/${newEvent.id}`, newEvent);
  return res.data;
}

export default function useUpdateEvent(
  opts?: Omit<UseMutationOptions<object, Error, Event>, "mutationFn">,
) {
  return useMutation<object, Error, Event>({
    ...opts,
    mutationFn: updateEvent,
  });
}
