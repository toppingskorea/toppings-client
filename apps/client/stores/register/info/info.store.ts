import { create } from "zustand";
import type { RegisterInfoInitialState, RegisterInfoState } from "./info.types";

const initialState: RegisterInfoInitialState = {
  country: "",
  habits: []
};

export const useRegisterInfoStore = create<RegisterInfoState>(set => ({
  ...initialState,
  dispatchCountry: country => set({ country }),
  dispatchHabits: habits => set({ habits })
}));
