import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";

// ha: west oa: east pa: south qa: north 순서
export interface Direction {
  qa: number;
  oa: number;
  pa: number;
  ha: number;
}
// default 좌표 설정(현재 내 위치 버튼을 클릭하지 않을수도 있음)
const mapBoundsAtom = atom<
  (kakao.maps.LatLngBounds & Direction) | Direction | null
>({
  key: "mapBounds",
  default: {
    qa: 37.499245767879145,
    oa: 127.03850255530531,
    pa: 37.502326218170865,
    ha: 127.03533449621763
  }
});

export const useMapBounds = () => useRecoilState(mapBoundsAtom);
export const useMapBoundsValue = () => useRecoilValue(mapBoundsAtom);
export const useMapBoundsSetter = () => useSetRecoilState(mapBoundsAtom);

const mapSearchByCountryAtom = atom<Restaurant.SearchByCountryDTO[] | null>({
  key: "mapSearchByCountry",
  default: null
});

export const useMapSearchByCountryState = () =>
  useRecoilState(mapSearchByCountryAtom);
export const useMapSearchByCountryValue = () =>
  useRecoilValue(mapSearchByCountryAtom);
export const useMapSearchByCountrySetter = () =>
  useSetRecoilState(mapSearchByCountryAtom);
export const useMapSearchByCountryReset = () =>
  useResetRecoilState(mapSearchByCountryAtom);
