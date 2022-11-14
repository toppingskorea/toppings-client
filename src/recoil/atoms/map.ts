/* eslint-disable import/prefer-default-export */
import { atom } from "recoil";

// ha: west oa: east pa: south qa: north 순서
export const mapBoundsAtom = atom<kakao.maps.LatLngBounds | null>({
  key: "mapBounds",
  default: null
});
