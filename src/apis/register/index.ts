import { http } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const register = (payload: {
  country: string;
  habit: { title: string; content: string }[];
}) => {
  return http.default.post("/api/user", {
    data: payload
  });
};
