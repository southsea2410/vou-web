import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import httpClient, { BasicResponse } from "../httpClient";
import { BrandType } from "../types";

async function getProfile(userId: string) {
  const res = await httpClient.get("api/v1/users/all-users/" + userId);
  return res.data;
}

export default function useGetProfile(
  userId: string,
  opts?: Omit<UseQueryOptions<BasicResponse<BrandType>>, "queryKey" | "queryFn">,
) {
  return useQuery<BasicResponse<BrandType>>({
    queryKey: ["profile_" + userId],
    queryFn: () => getProfile(userId),
    ...opts,
  });
}
