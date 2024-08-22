"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import mockAccounts from "../mocks/mockAccounts";
import adminHttpClient from "./httpClient";
import { Account } from "./types";

async function getAccounts() {
  const response = await adminHttpClient.get("https://api.example.com/accounts");
  const data = response.data;
  return data;
}

export default function useGetAccounts(opts?: UseQueryOptions<Account[]>) {
  return useQuery({
    ...opts,
    initialData: mockAccounts,
    queryKey: ["admin/accounts"],
    queryFn: getAccounts,
  });
}
