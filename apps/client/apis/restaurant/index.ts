import { authRequest, env } from "~/constants";

export const getRestaurant = async (id: number) => {
  const { data } = await authRequest.get<{ data: Restaurant.DetailDTO }>(
    `/v1/restaurant/${id}`
  );

  return data.data;
};

export const postScrap = async (id: number) => {
  await authRequest.post(`/v1/restaurant/${id}/scrap`);
};

export const deleteScrap = async (id: number) => {
  await authRequest.delete(`/v1/restaurant/${id}/scrap`);
};

export const postLike = async (id: number) => {
  await authRequest.post(`/v1/restaurant/${id}/like`);
};

export const deleteLike = async (id: number) => {
  await authRequest.delete(`/v1/restaurant/${id}/like`);
};

export const getLikePercent = async ({
  id,
  ssr
}: {
  id: number;
  ssr?: boolean;
}) => {
  const { data } = await authRequest.get<{ data: Restaurant.LikePercentDTO }>(
    `${ssr ? `${env.TOPPINGS_SERVER_URL}/api` : ""}/v1/restaurant/${id}/like`
  );

  return data.data;
};

export const getReviews = async ({
  id,
  ssr
}: {
  id: number;
  ssr?: boolean;
}) => {
  const { data } = await authRequest.get<{ data: Restaurant.ReviewDTO[] }>(
    `${ssr ? `${env.TOPPINGS_SERVER_URL}/api` : ""}/v1/restaurant/${id}/review`
  );

  return data.data;
};
