import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import httpClient from "../httpClient";
import { Event } from "../types";

async function getAllEvents() {
  const res = await httpClient.get("events/api/events");
  return res.data;
}

export default function useGetAllEvents(opts?: UseQueryOptions<Event[]>) {
  return useQuery<Event[]>({
    ...opts,
    queryKey: ["all", "events"],
    queryFn: getAllEvents,
  });
}
