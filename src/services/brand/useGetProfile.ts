import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import brandHttpClient from "./httpClient";

async function getProfile() {
  const res = await brandHttpClient.get("/profile");
  return res.data;
}

export default function useGetProfile(opts?: UseQueryOptions<object>) {
  return useQuery<object>({
    queryKey: ["profile"],
    queryFn: getProfile,
    ...opts,
  });
}
