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
  voucher_code?: string;
  qr_code?: string;
  description: string;
  expired_date: string;
  status: "active" | "inactive";
};

export type VoucherNoId = Omit<Voucher, "id" | "brand_id">;
export type EventNoId = Omit<Event, "id">;
