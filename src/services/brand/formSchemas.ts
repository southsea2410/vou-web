import { CreateEventRequest } from "./useCreateEvent";

export type EventFormData = Omit<
  CreateEventRequest,
  "listGameId_StartTime" | "brandIds" | "event"
> & {
  event: Omit<CreateEventRequest["event"], "image"> & {
    image: FileList | string;
  };
  games: string[];
  trivia_time: string;
  brandIds: [
    {
      id: string;
    },
  ];
};
