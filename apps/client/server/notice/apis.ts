import { authRequest } from "~/constants";

// eslint-disable-next-line import/prefer-default-export
export const getNotificationList = async (pageParam: number) => {
  const { data } = await authRequest.get<{
    data: Common.PaginationResponse<Notice.DTO>;
  }>(`/v1/alarm?page=${pageParam}`);

  return data.data;
};
