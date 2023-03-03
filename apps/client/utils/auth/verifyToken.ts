import jwt from "jwt-decode";

/*
  유효기간을 기준으로 토큰 검증을 진행합니다.
  유효한 토큰이라면 true
  유효하지 않은 토큰이라면 false를 반환합니다.
*/

export const verifyToken = (token: string) => {
  const decodedToken = jwt<{ exp: string }>(token);

  if (Date.now() <= Number(decodedToken.exp) * 1000) return true;

  return false;
};
