import { authRequest } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const getRecentHistory = async () => {
  const { data } = await authRequest.get<{ data: Recent.HistoryDTO[] }>(
    "/api/recent?type=Filter"
  );

  return data.data;
};

export const addRecentHistory = async (history: Recent.AddHistory) => {
  await authRequest.post("/api/recent", history);
};

export const deleteRecentAllHistory = async () => {
  await authRequest.delete("/api/recent");
};

export const deleteRecentHistory = async (id: number) => {
  await authRequest.delete(`/api/recent/${id}`);
};
