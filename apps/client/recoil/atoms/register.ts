import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";

const registerAtom = atom<{
  country: string;
  habit?: {
    title: Common.EatingHabit;
    content: string;
  }[];
}>({
  key: "registerAtom",
  default: {
    country: ""
  }
});

export const useRegisterState = () => useRecoilState(registerAtom);
export const useRegisterValue = () => useRecoilValue(registerAtom);
export const useRegisterSetter = () => useSetRecoilState(registerAtom);
export const useRegisterReset = () => useResetRecoilState(registerAtom);
