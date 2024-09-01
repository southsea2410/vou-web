import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { Game } from "../types";

export type UpdateGameReq = Game & { id: string };

async function updateGame(game: UpdateGameReq) {
  const res = await httpClient.put("games/games", game);
  return res.data;
}

export default function useUpdateGame(
  opts?: UseMutationOptions<BasicResponse<object>, Error, UpdateGameReq>,
) {
  return useMutation<BasicResponse<object>, Error, UpdateGameReq>({
    mutationFn: updateGame,
    ...opts,
  });
}
