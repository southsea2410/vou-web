import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Event } from "@/hooks/types";

import type {} from "@redux-devtools/extension"; // required for devtools typing

export type Step = {
  name: string;
  component: JSX.Element;
};

type EventState = {
  step: number;
  totalSteps: number;
  data: Event;
};

type EventActions = {
  setTotalSteps: (totalSteps: number) => void;
  nextStep: () => void;
  setField: (field: keyof Event, value: Event[keyof Event]) => void;
  previousStep: () => void;
};

const defaultState: EventState = {
  step: 0,
  totalSteps: 1,
  data: {
    id: "",
    name: "",
    image: "",
    number_of_voucher: 0,
    start_date: "",
    end_date: "",
  },
};

export const useEventStore = create<EventState & EventActions>((set, get) => ({
  ...defaultState,
  setTotalSteps: (totalSteps) => set((state) => ({ ...state, totalSteps })),
  nextStep: () =>
    set((state) => ({
      ...state,
      step: state.step + 1 >= state.totalSteps ? state.step : state.step + 1,
    })),
  setField: (field, value) => set((state) => ({ data: { ...state.data, [field]: value } })),
  previousStep: () =>
    set((state) => ({ ...state, step: state.step - 1 === -1 ? state.step : state.step - 1 })),
  reset: () => set((state) => ({ ...defaultState, step: 1, totalSteps: state.totalSteps })),
}));
