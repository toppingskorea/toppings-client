import { authRequest } from "~/constants";

export interface DefaultPayload {
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
  await authRequest.post(`/v1/admin/restaurant`, payload);
};

// 음식점 수정하기 아직 사용되지 않습니다. 추후 사용됩니다.
export const updatePost = async ({
  id,
  payload
}: {
  id: number;
  payload: DefaultPayload;
}) => {
  await authRequest.put(`/v1/admin/restaurant/${id}`, payload);
};
