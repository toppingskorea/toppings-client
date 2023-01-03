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
    qa: 37.56439694990648,
    oa: 126.98781499543738,
    pa: 37.56706877281314,
    ha: 126.98464619755325
  }
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
export const useMapSearchByCountryReset = () =>
  useResetRecoilState(mapSearchByCountryAtom);
