import { authRequest } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const getRecentHistory = async () => {
  const { data } = await authRequest.get<{ data: Recent.HistoryDTO[] }>(
    "/api/recent?type=Filter"
  );

  return data.data;
};
