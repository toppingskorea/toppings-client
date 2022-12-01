import { authRequest } from "~/constants";

// 프로필
export const getUserInfo = async () => {
  const { data } = await authRequest.get<{ data: Profile.UserDTO }>(
    `/api/user`
  );

  return data.data;
};

export const updateUserInfo = async (
  payload: Omit<
    Profile.UserDTO,
    "id" | "postCount" | "scrapCount" | "reviewCount"
  >
) => {
  const { data } = await authRequest.put<{ data: Profile.UserDTO }>(
    "/api/user",
    payload
  );

  return data.data;
};

export const logout = async () => {
  await authRequest.get("/api/logout");
};

// 유저 Posts
export const getUserPosts = async () => {
  const { data } = await authRequest.get<{ data: Profile.PostDTO[] }>(
    `/api/user/restaurant`
  );

  return data.data;
};
