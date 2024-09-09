import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { GetAccountInfoResponse } from "./useGetMyInfo";
import { BrandProfile, PlayerProfile } from "../types";

type CreateProfileRequest = PlayerProfile | BrandProfile;

async function createBrand<T extends BrandProfile | PlayerProfile>(profile: CreateProfileRequest) {
  const res = await httpClient.post("users/all-users/create", profile);
  return res.data;
}

export default function useCreateProfile<T extends BrandProfile | PlayerProfile>(
  opts?: UseMutationOptions<BasicResponse<GetAccountInfoResponse>, Error, CreateProfileRequest>,
) {
  return useMutation<BasicResponse<GetAccountInfoResponse>, Error, CreateProfileRequest>({
    mutationFn: createBrand,
    ...opts,
  });
}
