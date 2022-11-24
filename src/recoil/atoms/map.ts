/* eslint-disable import/prefer-default-export */
import { atom, useSetRecoilState } from "recoil";

// ha: west oa: east pa: south qa: north 순서
const mapBoundsAtom = atom<kakao.maps.LatLngBounds | null>({
  key: "mapBounds",
  default: null
});

export const useMapBoundsSetter = () => useSetRecoilState(mapBoundsAtom);
