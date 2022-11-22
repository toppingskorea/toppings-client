import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const registerAtom = atom<{
  country: string;
  habit?: {
    title: Register.EatingHabit;
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
