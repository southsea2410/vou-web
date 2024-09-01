import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import httpClient, { BasicResponse } from "../httpClient";
import { BrandType } from "../types";

async function getProfile(userId: string) {
  const res = await httpClient.get("users/all-users/" + userId);
  return res.data.result;
}

export default function useGetProfile(
  userId: string,
  opts?: Omit<UseQueryOptions<BrandType>, "queryKey" | "queryFn">,
) {
  return useQuery<BrandType>({
    queryKey: ["profile", "userId_" + userId],
    queryFn: () => getProfile(userId),
    ...opts,
  });
}
