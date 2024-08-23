import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { GetAccountInfoResponse } from "../identity/useAccountInfo";

export type CreateBrandRequest = {
  fullName: string;
  username: string;
  accountId: string;
  email: string;
  phone: string;
  role: string;
  status: boolean;
  brandName: string;
  field: string;
  address: string;
  latitude: number;
  longitude: number;
};

async function createBrand(account: CreateBrandRequest) {
  const res = await httpClient.post("api/v1/users/all-users/create", account);
  return res.data;
}

export default function useCreateBrand(
  opts?: UseMutationOptions<BasicResponse<GetAccountInfoResponse>, unknown, CreateBrandRequest>,
) {
  return useMutation<BasicResponse<GetAccountInfoResponse>, unknown, CreateBrandRequest>({
    mutationKey: ["create_brand_account"],
    mutationFn: createBrand,
    ...opts,
  });
}
