import { authRequest } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const register = (payload: {
  country: string;
  habits?: { title: string; content: string }[];
}) => {
  return authRequest.post("/v1/user", {
    country: payload.country,
    habit: payload.habits?.map(_habit => ({
      title: _habit.title,
      content: _habit.content.replace(" ", "")
    }))
  });
};
