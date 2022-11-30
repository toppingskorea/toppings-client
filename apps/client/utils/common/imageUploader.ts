import type { ChangeEvent } from "react";
import encodeFileToBase64 from "./encodeFileToBase64";
import resizeBase64Img from "./resizeBase64Img";

// 이벤트 인자를 받아서 base64 encoded 된 string을 반환합니다.
const imageUploader = async (
  e: ChangeEvent<HTMLInputElement>,
  compress = false
) => {
  if (!e.target.files) {
    throw new Error("올바르지 않은 이벤트 입니다.");
  }

  // 사용자가 파일 선택하다가 그만두는 경우.
  if (!e.target.files[0]) return null;

  const img = e.target.files[0];

  const base64 = await encodeFileToBase64(img);

  if (compress) {
    const resizedBase64 = await resizeBase64Img(base64 as string);
    return resizedBase64 as string;
  }

  return base64 as string;
};

export default imageUploader;
