import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import httpClient, { BasicResponse } from "../httpClient";
import { BrandType, GeneralProfileType } from "../types";

type ProfileResponse = GeneralProfileType & BrandType & { id: string };

async function getProfileByAccountId(accountId: string) {
  const res = await httpClient.get("api/v1/users/all-users/account/" + accountId);
  return res.data;
}

export default function useGetProfileByAccountId(
  accountId: string,
  opts?: Omit<UseQueryOptions<ProfileResponse>, "queryKey" | "queryFn">,
) {
  return useQuery<ProfileResponse>({
    queryKey: ["account_id_profile_" + accountId],
    queryFn: () => getProfileByAccountId(accountId),
    ...opts,
  });
}
