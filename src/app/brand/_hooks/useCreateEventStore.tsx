import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Event } from "@/hooks/types";

import type {} from "@redux-devtools/extension"; // required for devtools typing

type EventState = {
  step: number;
  totalSteps: number;
  data: Event;
  nextStep: () => void;
  previousStep: () => void;
  setData: (data: Event) => void;
};

const defaultState: EventState = {
  step: 0,
  totalSteps: 3,
  data: {
    id: "",
    name: "",
    image: "",
    number_of_voucher: 0,
    start_date: "",
    end_date: "",
  },
  nextStep: () => {},
};

const useEventStore = create<EventState>(devtools((set) => defaultState));
