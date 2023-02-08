import axios from "axios";

// 리뷰 목록 조회
export const getReviews = async (page: number) => {
  const { data } = await axios.get<{
    data: Common.PaginationResponse<Review.DTO>;
  }>(`/v1/admin/review?page=${page}`);

  return data.data;
};

// 리뷰 상세조회
export const getReview = async (id: number) => {
  const { data } = await axios.get<{
    data: Review.DetailDTO;
  }>(`/v1/admin/review/${id}`);

  return data.data;
};

// 리뷰 공개여부 수정
export const updatePublication = async ({
  id,
  isPub,
  cause
}: {
  id: number;
  isPub: boolean;
  cause?: string;
}) => {
  const response = await axios.put<Common.Response<number>>(
    `/v1/admin/review/${id}`,
    {
      isPub,
      cause
    }
  );

  return response.data;
};
