import { authRequest } from "~/constants";

export const getRestaurant = async (id: number) => {
  const { data } = await authRequest.get<{ data: Restaurant.DetailDTO }>(
    `/api/restaurant/${id}`
  );

  return data.data;
};

export const postScrap = async (id: number) => {
  await authRequest.post(`/api/restaurant/${id}/scrap`);
};

export const deleteScrap = async (id: number) => {
  await authRequest.delete(`/api/restaurant/${id}/scrap`);
};

export const postLike = async (id: number) => {
  await authRequest.post(`/api/restaurant/${id}/like`);
};

export const deleteLike = async (id: number) => {
  await authRequest.delete(`/api/restaurant/${id}/like`);
};
