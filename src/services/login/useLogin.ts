import axios from "axios";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type LoginRequest = {
  email: string;
  password: string;
};

async function sendLoginRequest({ email, password }: { email: string; password: string }) {
  const data = await axios.post("/api/login", { email, password });
  return data.data;
}

export function useLogin(opts?: UseMutationOptions<object, Error, LoginRequest>) {
  return useMutation<object, Error, LoginRequest>({ mutationFn: sendLoginRequest, ...opts });
}
