import axios from "axios";

// 음식점 목록 조회
export const getRestaurants = async (page: number) => {
  const { data } = await axios.get<{
    data: Common.PaginationResponse<Restaurant.DTO>;
  }>(`/v1/admin/restaurant?page=${page}`);

  return data.data;
};

// 음식점 상세조회
export const getRestaurant = async (id: number) => {
  const { data } = await axios.get<{
    data: Restaurant.DetailDTO;
  }>(`/v1/admin/restaurant/${id}`);

  return data.data;
};

// 음식점 공개여부 수정
export const updatePublication = async ({
  id,
  isPub,
  cause
}: {
  id: number;
  isPub: boolean;
  cause?: string;
}) => {
  await axios.put(`/v1/admin/restaurant/${id}`, {
    isPub,
    cause
  });
};
