import { atom, useRecoilState } from "recoil";

const registerAtom = atom<{
  country: string;
  habits: {
    title: Common.EatingHabit;
    content: string;
  }[];
}>({
  key: "registerAtom",
  default: {
    country: "",
    habits: []
  }
});

export const useRegisterState = () => useRecoilState(registerAtom);
