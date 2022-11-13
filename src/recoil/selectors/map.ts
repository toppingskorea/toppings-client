import { selector } from "recoil";
import { kakaoMapAtom } from "../atoms/map";

// eslint-disable-next-line import/prefer-default-export
export const withKakaoMap = selector({
  key: "withKakaoMap",
  get: ({ get }) => {
    return get(kakaoMapAtom);
  },
  set: ({ set }, newMap) => {
    set(kakaoMapAtom, newMap as kakao.maps.Map);
  }
});
