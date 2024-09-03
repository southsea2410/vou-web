"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { Event } from "../types";
import httpClient from "../httpClient";

async function getEvents(brand_id: string) {
  const res = await httpClient.get("events/api/events/brands/" + brand_id);
  return res.data;
}

type UseQueryOptionsOmitted<T> = Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export default function useGetEvents(brand_id: string, opts?: UseQueryOptionsOmitted<Event[]>) {
  return useQuery<Event[]>({
    queryKey: ["events", brand_id],
    queryFn: () => getEvents(brand_id),
    ...opts,
  });
}
