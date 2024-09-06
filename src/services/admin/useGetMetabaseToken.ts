import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

type MetabaseToken = {
  value: string;
};

export type MetabasePayload = {
  resource: { dashboard: number };
  params?: {
    [key: string]: any;
  };
};

async function getMetabaseToken(payload: MetabasePayload) {
  const res = await axios.post("/api/metabase", payload);
  return res.data;
}

export default function useGetMetabaseToken(
  payload: MetabasePayload,
  opts?: UseQueryOptions<MetabaseToken>,
) {
  return useQuery<MetabaseToken>({
    ...opts,
    queryKey: ["metabase token", JSON.stringify(payload)],
    queryFn: () => getMetabaseToken(payload),
  });
}
