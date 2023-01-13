import axios from "axios";

// 관리자 로그인
export const login = async (payload: {
  username: string;
  password: string;
}) => {
  await axios.post(`/api/login`, payload);
};

// 로그아웃
export const logout = async () => {
  await axios.get("/v1/logout");
};
