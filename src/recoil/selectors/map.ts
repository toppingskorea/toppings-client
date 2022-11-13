import { selector } from "recoil";
import { kakaoMapAtom, mapBoundsAtom } from "../atoms/map";

// eslint-disable-next-line import/prefer-default-export
export const withKakaoMap = selector({
  key: "withKakaoMap",
  get: ({ get }) => {
    return get(kakaoMapAtom);
  },
  set: ({ set }, newMap) => {
    set(kakaoMapAtom, newMap);
  }
});

export const withMapBounds = selector({
  key: "withMapBounds",
  get: ({ get }) => {
    return get(mapBoundsAtom);
  },
  set: ({ set }, newBounds) => {
    set(mapBoundsAtom, newBounds);
  }
});
