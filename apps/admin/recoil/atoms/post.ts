import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";
import type { types } from "~/constants/data/common";

const postUploadAtom = atom<{
  id?: number; // id가 존재한다면 수정입니다. 추후 사용합니다.
  images: string[];
  description: string;
  type?: Util.ElementType<typeof types>["label"];
}>({
  key: "postUploadAtom",
  default: {
    images: [],
    description: ""
  }
});

export const usePostUploadState = () => useRecoilState(postUploadAtom);
export const usePostUploadValue = () => useRecoilValue(postUploadAtom);
export const usePostUploadSetter = () => useSetRecoilState(postUploadAtom);
export const usePostUploadReset = () => useResetRecoilState(postUploadAtom);
