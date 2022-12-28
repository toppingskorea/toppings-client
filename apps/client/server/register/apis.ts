import { authRequest } from "~/constants";

export const register = (payload: {
  country: string;
  habit?: { title: string; content: string }[];
}) => {
  return authRequest.post("/v1/user", {
    country: payload.country,
    habit: payload.habit?.map(_habit => ({
      title: _habit.title,
      content: _habit.content.replace(" ", "")
    }))
  });
};
