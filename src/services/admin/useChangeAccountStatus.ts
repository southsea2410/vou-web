import httpClient, { BasicResponse } from "../httpClient";
import { AccountRoleType, BrandType, GeneralProfileType } from "../types";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

export type UpdateBrandProfileRequest = {
  profile: GeneralProfileType & BrandType & { id: string; role: AccountRoleType };
  userId: string;
};

async function changeAccountStatus({ profile, userId }: UpdateBrandProfileRequest) {
  const res = await httpClient.patch("users/all-users/" + userId, profile);
  return res.data;
}

export default function useChangeAccountStatus(
  opts?: UseMutationOptions<BasicResponse<object>, Error, UpdateBrandProfileRequest>,
) {
  return useMutation<BasicResponse<object>, Error, UpdateBrandProfileRequest>({
    mutationFn: changeAccountStatus,
    ...opts,
  });
}
