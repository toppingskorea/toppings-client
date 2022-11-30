import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";

/*
address_name: string; // "서울 강남구 신사동 647-16"
category_group_name: string; // "음식점"
id: string; // "2131313"
place_name: string; // 호호식당 도산공원
road_address_name: string; // 서울 강남구 도산대로49길 29-6"
x: string; // 127.036641958771
y: string; // 37.5250231003703
*/
const searchRestaurantAtom = atom<
  | Pick<
      kakao.maps.services.PlacesSearchResultItem,
      | "address_name"
      | "category_group_name"
      | "id"
      | "place_name"
      | "road_address_name"
      | "x"
      | "y"
    >
  | undefined
>({
  key: "restaurantAtom",
  default: undefined
});

export const useRestaurantState = () => useRecoilState(searchRestaurantAtom);
export const useRestaurantValue = () => useRecoilValue(searchRestaurantAtom);
export const useRestaurantSetter = () =>
  useSetRecoilState(searchRestaurantAtom);
export const useRestaurantReset = () =>
  useResetRecoilState(searchRestaurantAtom);
