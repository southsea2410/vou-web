export interface Event {
  id: string;
  name: string;
  image: string;
  numberOfVoucher: number;
  startDate: string;
  endDate: string;
}
export type EventNoId = Omit<Event, "id">;

export type Voucher = {
  id: string;
  brand_id: string;
  voucherCode: string;
  qrCode: string;
  image: string;
  value: number;
  description: string;
  expiredDate: string;
  status: number;
  unitValue: (typeof VoucherUnitValue)[number];
};
export type VoucherNoId = Omit<Voucher, "id" | "brand_id">;
export const VoucherUnitValue = ["PERCENT", "MINUS", "MINUS_PERCENT"] as const;

export type Item = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type ItemSelect = Pick<Item, "id" | "name">;

export type DialogState<T> = {
  open: boolean;
  item?: T;
};
