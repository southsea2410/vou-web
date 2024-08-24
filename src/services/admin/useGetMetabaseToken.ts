import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

type MetabaseToken = {
  value: string;
};

async function getMetabaseToken(dashboardId: number) {
  const res = await axios.get("/api/metabase?dashboardId=" + dashboardId);
  return res.data;
}

export default function useGetMetabaseToken(
  dashboardId: number,
  opts?: UseQueryOptions<MetabaseToken>,
) {
  return useQuery<MetabaseToken>({
    ...opts,
    queryKey: ["metabase, token, " + dashboardId],
    queryFn: () => getMetabaseToken(dashboardId),
  });
}
