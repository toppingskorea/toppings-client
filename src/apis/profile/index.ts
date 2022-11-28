import { authRequest, env } from "~/constants";

export const getUserInfo = async () => {
  const { data } = await authRequest.get<{ data: Profile.UserDTO }>(
    `${env.TOPPINGS_SERVER_URL}/user`
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
