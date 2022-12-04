import { authRequest } from "~/constants";

interface DefaultPayload {
  name: string;
  description: string;
  address: string;
  zipcode: string;
  code: string;
  latitude: number;
  longitude: number;
  type: string;
  images: string[];
}

// 음식점 등록하기
export const uploadPost = async (payload: DefaultPayload) => {
  await authRequest.post(`/api/restaurant`, payload);
};

// 음식점 수정하기
export const updatePost = async ({
  id,
  payload
}: {
  id: number;
  payload: DefaultPayload;
}) => {
  await authRequest.put(`/api/restaurant/${id}`, payload);
};

// 음식점 삭제하기
export const deletePost = async (id: number) => {
  await authRequest.delete(`/api/restaurant/${id}`);
};
