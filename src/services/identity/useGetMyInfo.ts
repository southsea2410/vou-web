import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import httpClient, { BasicResponse } from "../httpClient";

export interface GetAccountInfoResponse {
  id: string;
  username: string;
  roles: Role[];
}

interface Role {
  name: string;
  description: string;
  permissions: any[];
}

async function getMyInfo() {
  const res = await httpClient.get("identity/users/my-info");
  return res.data.result;
}

export default function useGetMyInfo(
  opts?: Omit<UseQueryOptions<GetAccountInfoResponse>, "queryKey" | "queryFn">,
) {
  return useQuery<GetAccountInfoResponse>({
    queryKey: ["my info"],
    queryFn: getMyInfo,
    ...opts,
  });
}
