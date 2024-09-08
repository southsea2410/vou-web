import { GameType, GameTypes } from "../types";
import { CreateEventRequest } from "./useCreateEvent";

export type EventFormData = Omit<
  CreateEventRequest,
  "listGameId_StartTime" | "emails" | "event"
> & {
  event: Omit<CreateEventRequest["event"], "image" | "startDate" | "endDate"> & {
    image: FileList | string;
    startDate: Date;
    endDate: Date;
  };
  games: GameType[];
  game_time: string;
  emails: [
    {
      id: string;
    },
  ];
};
