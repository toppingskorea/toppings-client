import { atom } from "recoil";

// eslint-disable-next-line import/prefer-default-export
export const kakaoMapAtom = atom<kakao.maps.Map | null>({
  key: "kakaoMapAtom",
  default: null
});

// ha: west oa: east pa: south qa: north 순서
export const mapBoundsAtom = atom<kakao.maps.LatLngBounds | null>({
  key: "mapBounds",
  default: null
});
