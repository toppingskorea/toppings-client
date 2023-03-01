import { create } from "zustand";
import type { HeaderInitialState, HeaderState } from "./header.types";

const initialState: HeaderInitialState = {
  content: "토핑즈 관리자 페이지 입니다."
};

export const useHeaderStore = create<HeaderState>(set => ({
  ...initialState,
  dispatchHeader: value => set({ content: value })
}));
