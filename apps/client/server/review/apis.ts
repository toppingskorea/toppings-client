import { authRequest } from "~/constants";

// 댓글 목록 조회하기
export const getReviews = async (id: number, pageParam: number) => {
  const { data } = await authRequest.get<{
    data: Common.PaginationResponse<Restaurant.ReviewDTO>;
  }>(`/v1/restaurant/${id}/review?page=${pageParam}`);

  return data.data;
};

// 댓글 상세 조회하기
export const getReview = async (id?: number) => {
  const { data } = await authRequest.get<{ data: Restaurant.ReviewDTO }>(
    `/v1/review/${id}`
  );

  return data.data;
};

type DefaultPayload = {
  description: string;
  images: string[];
};

// 댓글 등록하기
export const uploadReview = async ({
  restaurantId,
  payload
}: {
  restaurantId: number;
  payload: DefaultPayload;
}) => {
  await authRequest.post(`/v1/restaurant/${restaurantId}/review`, payload);
};

// 리뷰 수정하기
export const updateReview = async ({
  id,
  payload
}: {
  id: number;
  payload: DefaultPayload;
}) => {
  await authRequest.put(`/v1/review/${id}`, payload);
};

// 리뷰 삭제하기
export const deleteReview = async (id: number) => {
  await authRequest.delete(`/v1/review/${id}`);
};
