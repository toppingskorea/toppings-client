import { authRequest } from "~/constants";

// 프로필
export const getUserInfo = async () => {
  const { data } = await authRequest.get<{ data: Profile.UserDTO }>(`/v1/user`);

  return data.data;
};

export const updateUserInfo = async (
  payload: Omit<
    Profile.UserDTO,
    "id" | "postCount" | "scrapCount" | "reviewCount"
  >
) => {
  const { data } = await authRequest.put<{ data: Profile.UserDTO }>(
    "/v1/user",
    payload
  );

  return data.data;
};

export const logout = async () => {
  await authRequest.get("/v1/logout");
};

// 유저 Posts
export const getUserPosts = async (pageParam: number) => {
  const { data } = await authRequest.get<{
    data: Common.PaginationResponse<Profile.PostDTO>;
  }>(`/v1/user/restaurant?page=${pageParam}`);

  return data.data;
};

// 유저 회원의 스크랩 게시물 조회
export const getUserScraps = async (pageParam: number) => {
  const { data } = await authRequest.get<{
    data: Common.PaginationResponse<Restaurant.BaseDTO>;
  }>(`/v1/user/scrap?page=${pageParam}`);

  return data.data;
};

// 유저 회원의 댓글 게시물 조회
export const getUserReviewedRestaurant = async (pageParam: number) => {
  const { data } = await authRequest.get<{
    data: Common.PaginationResponse<Restaurant.BaseDTO>;
  }>(`/v1/user/review?page=${pageParam}`);

  return data.data;
};
