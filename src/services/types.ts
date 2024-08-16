export type Event = {
  id: string;
  name: string;
  image: string | File;
  number_of_voucher: number;
  start_date: string;
  end_date: string;
  games: ("trivia" | "shake")[];
};

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
export type EventNoId = Omit<Event, "id">;

export type Item = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type ItemSelect = Pick<Item, "id" | "name">;

export const VoucherUnitValue = ["PERCENT", "MINUS", "MINUS_PERCENT"] as const;
