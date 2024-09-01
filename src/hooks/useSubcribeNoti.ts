"use client";

import httpClient from "@/services/httpClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

async function subcribeNoti({ userId, token }: SubcribeNotiFn) {
  const response = await httpClient.post(
    "notifications/api/notifications/register?userId=" + userId + "&token=" + token,
  );
  return response.data;
}

export type SubcribeNotiFn = { userId: string; token: string };

export default function useSubcribeNoti(opts?: UseMutationOptions<string, Error, SubcribeNotiFn>) {
  return useMutation<string, Error, SubcribeNotiFn>({
    ...opts,
    mutationFn: subcribeNoti,
  });
}
