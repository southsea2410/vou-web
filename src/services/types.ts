export const AccountRoles = ["brand", "player", "admin"] as const;
export type AccountRoleType = (typeof AccountRoles)[number];

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
  voucherType: VoucherType;
  unitValue: (typeof VoucherUnitValue)[number];
};
export type VoucherNoId = Omit<Voucher, "id" | "brand_id">;
export const VoucherUnitValue = ["PERCENT", "MINUS", "MINUS_PERCENT"] as const;
export const VoucherTypes = ["online", "offline"] as const;
export type VoucherType = (typeof VoucherTypes)[number];

export type Item = {
  id: string;
  brand_id: string;
  name: string;
  icon: string;
  description: string;
};

export type ItemSelect = Pick<Item, "id" | "name">;

export type DialogState<T> = {
  open: boolean;
  item?: T;
};

export type GeneralProfileType = {
  fullName: string;
  username: string;
  accountId: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
};

export type PlayerType = {
  gender: string;
  facebookAccount: string;
  dateOfBirth: string;
  avatar: string;
  turns: number;
};

export type PlayerProfile = GeneralProfileType & PlayerType;

export type BrandType = {
  brandName: string;
  field: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type BrandProfile = GeneralProfileType & BrandType;

export type Game = {
  name: string;
  type: GameType;
  instruction: string;
  image: string;
  itemSwappable: boolean;
};

export const GameTypes = ["quiz", "shaking"] as const;
export type GameType = (typeof GameTypes)[number];
