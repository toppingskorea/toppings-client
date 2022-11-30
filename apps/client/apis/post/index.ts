import { authRequest } from "~/constants";

// 음식점 등록하기
export const uploadPost = async (payload: {
  name: string;
  description: string;
  address: string;
  zipcode: string;
  code: string;
  latitude: number;
  longitude: number;
  type: string;
  images: string[];
}) => {
  await authRequest.post(`/api/restaurant`, payload);
};
