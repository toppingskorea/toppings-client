import type { ChangeEvent } from "react";
import { encodeFileToBase64, resizeBase64Img } from ".";

// 이벤트 인자를 받아서 base64 encoded 된 string을 반환합니다.
export const imageUploader = async (
  e: ChangeEvent<HTMLInputElement>,
  compress = false
) => {
  if (!e.target.files) {
    throw new Error("올바르지 않은 이벤트 입니다.");
  }

  // 사용자가 파일 선택하다가 그만두는 경우.
  if (!e.target.files[0]) return null;

  const imgList = e.target.files;

  const base64List = await Promise.all(
    Array.from(imgList).map(encodeFileToBase64)
  );

  if (compress) {
    const resizedBase64List = await Promise.all(
      base64List.map(base64 => resizeBase64Img(base64 as string))
    );
    return resizedBase64List as string[];
  }

  return base64List as string[];
};
