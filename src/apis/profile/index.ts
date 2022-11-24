import { authRequest } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const getUserInfo = async () => {
  const { data } = await authRequest.get<{ data: Profile.UserDTO }>(
    "/api/user"
  );

  return data.data;
};
