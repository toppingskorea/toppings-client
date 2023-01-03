import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";

const currentSelectCategoryAtom = atom<string>({
  key: "currentSelectCategory",
  default: ""
});

export const useCurrentSelectCategoryValue = () =>
  useRecoilValue(currentSelectCategoryAtom);
export const useCurrentSelectCategorySetter = () =>
  useSetRecoilState(currentSelectCategoryAtom);
export const useCurrentSelectCategoryReset = () =>
  useResetRecoilState(currentSelectCategoryAtom);
