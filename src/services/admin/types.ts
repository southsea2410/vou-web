export type Account = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  role: (typeof AccountRoles)[number];
  status: number;
};

export const AccountRoles = ["brand", "player"] as const;
