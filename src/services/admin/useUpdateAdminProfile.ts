import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { AccountRoleType, GeneralProfileType } from "../types";

export type UpdateAdminProfileRequest = {
  profile: GeneralProfileType & { id: string; role: AccountRoleType };
  profileId: string;
};

async function updateAdminProfile({ profile, profileId }: UpdateAdminProfileRequest) {
  const res = await httpClient.patch("api/v1/users/all-users/" + profileId, profile);
  return res.data;
}

export default function useUpdateAdminProfile(
  opts?: UseMutationOptions<BasicResponse<object>, Error, UpdateAdminProfileRequest>,
) {
  return useMutation<BasicResponse<object>, Error, UpdateAdminProfileRequest>({
    mutationFn: updateAdminProfile,
    ...opts,
  });
}
