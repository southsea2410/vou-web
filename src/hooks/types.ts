export type Event = {
  id: string;
  name: string;
  image: string | File;
  number_of_voucher: number;
  start_date: string;
  end_date: string;
};

export type Voucher = {
  id: string;
  brand_id: string;
  voucher_code?: string;
  qr_code?: string;
};
