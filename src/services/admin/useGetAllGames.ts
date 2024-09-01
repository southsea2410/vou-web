import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import httpClient from "../httpClient";
import { Game } from "../types";

async function getAllGames() {
  const res = await httpClient.get("games/games");
  return res.data;
}

export default function useGetAllGames(
  opts?: Omit<UseQueryOptions<Game[]>, "queryKey" | "queryFn">,
) {
  return useQuery({
    ...opts,
    queryKey: ["all_games"],
    queryFn: getAllGames,
  });
}
