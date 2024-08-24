"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

async function getUrl(key: string) {
  const response = await axios.get("/api/presign/download/" + key);
  const data = response.data.signedUrl;
  return data;
}

export default function useGetObjectUrl(key: string, opts?: UseQueryOptions<string>) {
  return useQuery<string>({
    ...opts,
    queryKey: ["get_image_url", key],
    queryFn: () => getUrl(key),
  });
}
