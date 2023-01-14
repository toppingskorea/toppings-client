import axios from "axios";

// 카운트 조회
export const getCount = async () => {
  const { data } = await axios.get<{ data: Overview.DTO }>(`/v1/admin/count`);
  return data.data;
};
