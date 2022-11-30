import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState
} from "recoil";
import type { types } from "~/constants/data/common";

const postUploadAtom = atom<{
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
export const usePostUploadReset = () => useResetRecoilState(postUploadAtom);
