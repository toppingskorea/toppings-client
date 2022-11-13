import { atom } from "recoil";

// eslint-disable-next-line import/prefer-default-export
export const kakaoMapAtom = atom<kakao.maps.Map | null>({
  key: "kakaoMapAtom",
  default: null
});
