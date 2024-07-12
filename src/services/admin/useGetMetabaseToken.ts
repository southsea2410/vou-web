import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

type MetabaseToken = {
  value: string;
};

async function getMetabaseToken() {
  const res = await axios.get("/api/metabase");
  return res.data;
}

export default function useGetMetabaseToken(
  opts?: UseQueryOptions<MetabaseToken>,
) {
  return useQuery<MetabaseToken>({
    ...opts,
    queryKey: ["metabase, token"],
    queryFn: getMetabaseToken,
  });
}
