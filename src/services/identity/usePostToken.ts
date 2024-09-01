import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { BasicResponse, noTokenClient } from "../httpClient";

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = BasicResponse<{
  token: string;
}>;

async function sendLoginRequest({ username, password }: LoginRequest) {
  const data = await noTokenClient.post("identity/auth/token", { username, password });
  return data.data;
}

export default function usePostToken(
  opts?: UseMutationOptions<LoginResponse, Error, LoginRequest>,
) {
  return useMutation<LoginResponse, Error, LoginRequest>({ mutationFn: sendLoginRequest, ...opts });
}
