import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const registerAtom = atom<{
  code: string;
  country: string;
  habit?: {
    title: Register.EatingHabit;
    content: string;
  };
}>({
  key: "registerAtom",
  default: {
    code: "",
    country: ""
  }
});

export const useRegister = () => useRecoilState(registerAtom);
export const useRegisterValue = () => useRecoilValue(registerAtom);
export const useRegisterSetter = () => useSetRecoilState(registerAtom);
