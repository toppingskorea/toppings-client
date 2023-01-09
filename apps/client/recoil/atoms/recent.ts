import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";

const currentSelectKeywordAtom = atom<string>({
  key: "currentSelectKeyword",
  default: ""
});

export const useCurrentSelectKeyword = () =>
  useRecoilState(currentSelectKeywordAtom);
export const useCurrentSelectKeywordValue = () =>
  useRecoilValue(currentSelectKeywordAtom);
export const useCurrentSelectKeywordSetter = () =>
  useSetRecoilState(currentSelectKeywordAtom);
export const useCurrentSelectKeywordReset = () =>
  useResetRecoilState(currentSelectKeywordAtom);

const currentSelectCategoryAtom = atom<string>({
  key: "currentSelectCategory",
  default: ""
});

export const useCurrentSelectCategoryValue = () =>
  useRecoilValue(currentSelectCategoryAtom);
export const useCurrentSelectCategorySetter = () =>
  useSetRecoilState(currentSelectCategoryAtom);
