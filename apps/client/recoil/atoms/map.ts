import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

// ha: west oa: east pa: south qa: north 순서
export interface Direction {
  qa: number;
  oa: number;
  pa: number;
  ha: number;
}

const mapBoundsAtom = atom<(kakao.maps.LatLngBounds & Direction) | null>({
  key: "mapBounds",
  default: null
});

export const useMapBounds = () => useRecoilState(mapBoundsAtom);
export const useMapBoundsValue = () => useRecoilValue(mapBoundsAtom);
export const useMapBoundsSetter = () => useSetRecoilState(mapBoundsAtom);

const mapSearchByCountryAtom = atom<Restaurant.SearchByCountryDTO[] | null>({
  key: "mapSearchByCountry",
  default: null
});

export const useMapSearchByCountryValue = () =>
  useRecoilValue(mapSearchByCountryAtom);
export const useMapSearchByCountrySetter = () =>
  useSetRecoilState(mapSearchByCountryAtom);
