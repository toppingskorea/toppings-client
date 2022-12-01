import { atom, useRecoilValue, useSetRecoilState } from "recoil";

// ha: west oa: east pa: south qa: north 순서
const mapBoundsAtom = atom<kakao.maps.LatLngBounds | null>({
  key: "mapBounds",
  default: null
});

export const useMapBoundsSetter = () => useSetRecoilState(mapBoundsAtom);

const mapSearchByCountryAtom = atom<Restaurant.SearchByCountryDTO[] | null>({
  key: "mapSearchByCountry",
  default: null
});

export const useMapSearchByCountryValue = () =>
  useRecoilValue(mapSearchByCountryAtom);
export const useMapSearchByCountrySetter = () =>
  useSetRecoilState(mapSearchByCountryAtom);
