import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { AccountRoleType, BrandType, GeneralProfileType } from "../types";

export type UpdateBrandProfileRequest = {
  profile: GeneralProfileType & BrandType & { id: string; role: AccountRoleType };
  userId: string;
};

async function updateBrandProfile({ profile, userId }: UpdateBrandProfileRequest) {
  const res = await httpClient.patch("api/v1/users/all-users/" + userId, profile);
  return res.data;
}

export default function useUpdateBrandProfile(
  opts?: UseMutationOptions<BasicResponse<object>, Error, UpdateBrandProfileRequest>,
) {
  return useMutation<BasicResponse<object>, Error, UpdateBrandProfileRequest>({
    mutationFn: updateBrandProfile,
    ...opts,
  });
}
