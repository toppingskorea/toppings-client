import { authRequest } from "~/constants";
import type { Direction } from "~/recoil/atoms";

export const getRecentHistory = async () => {
  const { data } = await authRequest.get<{ data: Recent.HistoryDTO[] }>(
    "/v1/recent?type=Filter"
  );

  return data.data;
};

export const addRecentHistory = async (
  history: Omit<Recent.HistoryDTO, "id">
) => {
  await authRequest.post("/v1/recent", history);
};

export const deleteRecentAllHistory = async () => {
  await authRequest.delete("/v1/recent");
};

export const deleteRecentHistory = async (id: number) => {
  await authRequest.delete(`/v1/recent/${id}`);
};

export const getRestaurantByCountry = async (country: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/v1/restaurant?type=Country&country=${country}`);

  return data.data;
};

export const getEatingHabitByFiltering = async ({
  habit,
  habitTitle
}: {
  habit: string;
  habitTitle: string;
}) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/v1/restaurant?type=Habit&habit=${habit}&habitTitle=${habitTitle}`);

  return data.data;
};

export const getRestaurantNameByFiltering = async (name: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/v1/restaurant?type=Name&name=${name}`);

  return data.data;
};

export const getDefaultMap = async (
  direction: kakao.maps.LatLngBounds & Direction
) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(
    `/v1/restaurant?type=Map&y1=${direction.ha}&y2=${direction.oa}&x1=${direction.qa}&x2=${direction.pa}`
  );

  return data.data;
};
