import { Voucher } from "../types";

const mockVouchers: Voucher[] = [
  {
    id: "1",
    brand_id: "1",
    image: "https://picsum.photos/200/300.webp",
    value: 100,
    unitValue: "PERCENT",
    qrCode: "https://www.google.com",
    voucherCode: "Voucher 1",
    description: "Voucher 1",
    expiredDate: "2021-09-30",
    status: 1,
  },
  {
    id: "2",
    brand_id: "1",
    image: "https://picsum.photos/200/300.webp",
    value: 200,
    unitValue: "MINUS",
    qrCode: "https://www.google.com",
    voucherCode: "Voucher 2",
    description: "Voucher 2",
    expiredDate: "2021-09-30",
    status: 1,
  },
  {
    id: "3",
    brand_id: "1",
    image: "https://picsum.photos/200/300.webp",
    value: 300,
    unitValue: "MINUS_PERCENT",
    qrCode: "https://www.google.com",
    voucherCode: "Voucher 3",
    description: "Voucher 3",
    expiredDate: "2021-09-30",
    status: 1,
  },
];

export default mockVouchers;
