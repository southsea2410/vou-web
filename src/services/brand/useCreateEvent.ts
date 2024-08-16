// Full-info Create Event API Schema
export interface CreateEventRequest {
  event: Event;
  listGameId_StartTime: ListGameIdStartTime[];
  listVoucher_Items: ListVoucherItem[];
  brandIds: string[];
}

interface Event {
  name: string;
  image: string;
  numberOfVoucher: number;
  startDate: string;
  endDate: string;
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
