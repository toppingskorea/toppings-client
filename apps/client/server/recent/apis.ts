import { authRequest } from "~/constants";

// 최근검색 / 최근 검색 목록 조회
export const getRecentHistories = async (page: number) => {
  const { data } = await authRequest.get<{ data: Recent.HistoryDTO }>(
    `/v1/recent?type=Filter&page=${page}`
  );

  return data.data;
};

// 최근검색 / 최근 검색 등록
export const addRecentHistory = async (
  history: Omit<Recent.HistoryItem, "id">
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
export const getRestaurantByCountry = async ({
  country,
  direction
}: {
  country: string;
  direction: Map.KakaoBounds;
}) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByFilteringDTO[];
  }>(
    `/v1/restaurant/filter?type=Country&country=${country}&y1=${direction.ha}&y2=${direction.oa}&x1=${direction.qa}&x2=${direction.pa}`
  );

  return data.data;
};

// 음식점 / 음식점 검색 (필터)
export const getRestaurantByEatingHabit = async ({
  habit,
  habitTitle,
  direction
}: {
  habit: string;
  habitTitle: Common.EatingHabit;
  direction: Map.KakaoBounds;
}) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByFilteringDTO[];
  }>(
    `/v1/restaurant/filter?type=Habit&habit=${habit}&habitTitle=${habitTitle}&y1=${direction.ha}&y2=${direction.oa}&x1=${direction.qa}&x2=${direction.pa}`
  );

  return data.data;
};

// 음식점 / 음식점 검색 (필터)
export const getRestaurantByName = async (name: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByFilteringDTO[];
  }>(`/v1/restaurant/filter?type=Name&name=${name}`);

  return data.data;
};

// 음식점 / 음식점 검색 (지도)
export const getDefaultRestaurant = async (direction: Map.KakaoBounds) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByFilteringDTO[];
  }>(
    `/v1/restaurant/map?y1=${direction.ha}&y2=${direction.oa}&x1=${direction.qa}&x2=${direction.pa}`
  );

  return data.data;
};
