import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { AccountRoleType } from "../types";
import { GetAccountInfoResponse } from "./useAccountInfo";

export type CreateAccountRequest = {
  username: string;
  password: string;
  roles: AccountRoleType[];
};

async function createAccount(account: CreateAccountRequest) {
  const res = await httpClient.post("api/v1/identity/users/registration", account);
  return res.data;
}

export default function useCreateAccount(
  opts?: UseMutationOptions<BasicResponse<GetAccountInfoResponse>, unknown, CreateAccountRequest>,
) {
  return useMutation<BasicResponse<GetAccountInfoResponse>, unknown, CreateAccountRequest>({
    mutationKey: ["create_account"],
    mutationFn: createAccount,
    ...opts,
  });
}
