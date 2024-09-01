"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import adminHttpClient from "../httpClient";
import { GeneralProfileType } from "../types";

async function getAllUsers() {
  const response = await adminHttpClient.get("users/all-users");
  const data = response.data;
  return data;
}

export default function useGetAllUsers(opts?: UseQueryOptions<GeneralProfileType[]>) {
  return useQuery({
    ...opts,
    queryKey: ["admin_all_accounts"],
    queryFn: getAllUsers,
  });
}
