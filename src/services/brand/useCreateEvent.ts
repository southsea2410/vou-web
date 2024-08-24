import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Event } from "../types";
import httpClient from "../httpClient";

// Full-info Create Event API Schema
export interface CreateEventRequest {
  event: Event & { games: ("trivia" | "shake")[] };
  listGameId_StartTime: ListGameIdStartTime[];
  listVoucher_Items: ListVoucherItem[];
  brandIds: string[];
}

interface ListGameIdStartTime {
  gameId: number;
  startTime: string;
}

interface ListVoucherItem {
  voucherId: string;
  quantityOfVoucher: number;
  itemIds_quantities: ItemIdsQuantity[];
}

interface ItemIdsQuantity {
  itemId: string;
  quantity: number;
}

async function createEvent(eventReq: CreateEventRequest) {
  const res = await httpClient.post("api/v1/events/api/events/create", eventReq);
  return res.data;
}

export default function useCreateEvent(
  opts?: UseMutationOptions<object, Error, CreateEventRequest>,
) {
  return useMutation<object, Error, CreateEventRequest>({ ...opts, mutationFn: createEvent });
}
