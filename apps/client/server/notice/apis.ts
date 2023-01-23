import { authRequest } from "~/constants";

export const getNotificationList = async (pageParam: number) => {
  const { data } = await authRequest.get<{
    data: Common.PaginationResponse<Notice.DTO>;
  }>(`/v1/alarm?page=${pageParam}`);

  return data.data;
};

export const sendNotification = async (payload: {
  id: number;
  type: "Like" | "Review" | "Scrap";
}) => {
  await authRequest.post(`/v1/alarm`, payload);
};
