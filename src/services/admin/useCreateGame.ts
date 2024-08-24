import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { Game } from "../types";
import httpClient from "../httpClient";

async function createGame(game: Game) {
  const res = await httpClient.post("api/v1/games/games", game);
  return res.data;
}

export default function useCreateGame(
  opts?: Omit<UseMutationOptions<object, Error, Game>, "mutationFn">,
) {
  return useMutation<object, Error, Game>({ ...opts, mutationFn: createGame });
}
