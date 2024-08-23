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

async function getAccount() {
  const res = await httpClient.get("api/v1/identity/users/my-info");
  return res.data;
}

export default function useGetAccountInfo(
  opts?: Omit<UseQueryOptions<BasicResponse<GetAccountInfoResponse>>, "queryKey" | "queryFn">,
) {
  return useQuery<BasicResponse<GetAccountInfoResponse>>({
    queryKey: ["account_info"],
    queryFn: getAccount,
    ...opts,
  });
}
