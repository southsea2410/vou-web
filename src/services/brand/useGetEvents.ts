"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { mockEvents } from "../mocks/mockEvents";
import { Event } from "../types";
import httpClient from "../httpClient";

async function getEvents(brand_id: string) {
  const res = await httpClient.get("/events" + brand_id);
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetEvents(brand_id: string, opts?: UseQueryOptionsOmitted<Event[]>) {
  return useQuery<Event[]>({
    queryKey: ["items"],
    queryFn: () => getEvents(brand_id),
    initialData: mockEvents,
    ...opts,
  });
}
