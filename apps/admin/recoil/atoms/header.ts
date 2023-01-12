import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const headerAtom = atom<string>({
  key: "headerAtom",
  default: "토핑즈 관리자 페이지 입니다."
});

export const useHeaderValue = () => useRecoilValue(headerAtom);
export const useHeaderSetter = () => useSetRecoilState(headerAtom);
