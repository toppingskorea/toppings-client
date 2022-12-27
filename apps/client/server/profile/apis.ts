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
export const getUserPosts = async () => {
  const { data } = await authRequest.get<{ data: Profile.PostDTO[] }>(
    `/v1/user/restaurant`
  );

  return data.data;
};
