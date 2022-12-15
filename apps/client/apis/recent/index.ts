import { authRequest } from "~/constants";
import type { Direction } from "~/recoil/atoms";

export const getRecentHistory = async () => {
  const { data } = await authRequest.get<{ data: Recent.HistoryDTO[] }>(
    "/api/recent?type=Filter"
  );

  return data.data;
};

export const addRecentHistory = async (
  history: Omit<Recent.HistoryDTO, "id">
) => {
  await authRequest.post("/api/recent", history);
};

export const deleteRecentAllHistory = async () => {
  await authRequest.delete("/api/recent");
};

export const deleteRecentHistory = async (id: number) => {
  await authRequest.delete(`/api/recent/${id}`);
};

export const getRestaurantByCountry = async (country: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/api/restaurant?type=Country&country=${country}`);

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
  }>(`/api/restaurant?type=Habit&habit=${habit}&habitTitle=${habitTitle}`);

  return data.data;
};

export const getRestaurantNameByFiltering = async (name: string) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(`/api/restaurant?type=Name&name=${name}`);

  return data.data;
};

export const getDefaultMap = async (
  direction: kakao.maps.LatLngBounds & Direction
) => {
  const { data } = await authRequest.get<{
    data: Restaurant.SearchByCountryDTO[];
  }>(
    `/api/restaurant?type=Map&y1=${direction.ha}&y2=${direction.oa}&x1=${direction.qa}&x2=${direction.pa}`
  );

  return data.data;
};
