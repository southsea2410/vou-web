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
  games: string[];
  trivia_time: string;
  emails: [
    {
      id: string;
    },
  ];
};
