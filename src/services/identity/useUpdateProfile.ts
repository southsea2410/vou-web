import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { GetAccountInfoResponse } from "./useGetMyInfo";
import { BrandProfile, PlayerProfile } from "../types";

export type UpdateBrandPlayerRequest = {
  userId: string;
  newProfile: BrandProfile | PlayerProfile;
};

async function updateProfile({ userId, newProfile }: UpdateBrandPlayerRequest) {
  const res = await httpClient.patch("users/all-users/" + userId, newProfile);
  return res.data;
}

export default function useUpdateProfile(
  opts?: UseMutationOptions<BasicResponse<GetAccountInfoResponse>, Error, UpdateBrandPlayerRequest>,
) {
  return useMutation<BasicResponse<GetAccountInfoResponse>, Error, UpdateBrandPlayerRequest>({
    mutationFn: updateProfile,
    ...opts,
  });
}
