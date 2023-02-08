import { authRequest } from "~/constants";

export const sendNotification = async (payload: {
  id: number;
  type: "RejectReview" | "RejectRestaurant";
}) => {
  await authRequest.post(`/v1/alarm`, payload);
};
