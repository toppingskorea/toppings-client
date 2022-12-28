import type { Direction } from "@atoms/index";
import { authRequest } from "~/constants";

// 최근검색 / 최근 검색 목록 조회
export const getRecentHistory = async () => {
  const { data } = await authRequest.get<{ data: Recent.HistoryDTO[] }>(
    "/v1/recent?type=Filter"
  );

  return data.data;
};

// 최근검색 / 최근 검색 등록
export const addRecentHistory = async (
  history: Omit<Recent.HistoryDTO, "id">
) => {
  await authRequest.post("/v1/recent", history);
};

// 최근검색 / 최근 검색어 전체 삭제
export const deleteAllRecentHistory = async () => {
  await authRequest.delete("/v1/recent");
};

// 최근검색 / 최근 검색어 삭제
export const deleteRecentHistory = async (id: number) => {
  await authRequest.delete(`/v1/recent/${id}`);
};

// 음식점 / 음식점 검색 (필터)
export const getRestaurantByCountry = async (country: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/v1/restaurant/filter?type=Country&country=${country}`);

  return data.data;
};

// 음식점 / 음식점 검색 (필터)
export const getEatingHabitByFiltering = async ({
  habit,
  habitTitle
}: {
  habit: string;
  habitTitle: string;
}) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(
    `/v1/restaurant/filter?type=Habit&habit=${habit}&habitTitle=${habitTitle}`
  );

  return data.data;
};

// 음식점 / 음식점 검색 (필터)
export const getRestaurantNameByFiltering = async (name: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/v1/restaurant/filter?type=Name&name=${name}`);

  return data.data;
};

// 음식점 / 음식점 검색 (지도)
export const getDefaultMap = async (
  direction: kakao.maps.LatLngBounds & Direction
) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(
    `/v1/restaurant/map?y1=${direction.ha}&y2=${direction.oa}&x1=${direction.qa}&x2=${direction.pa}`
  );

  return data.data;
};
