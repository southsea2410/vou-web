import { Event } from "@/services/types";

export type BasicEventInfoForm = {
  name: string;
  // image: FileList;
  start_date: Date;
  end_date: Date;
  games: Event["games"];
  game_time?: string;
};
