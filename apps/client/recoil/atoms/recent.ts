import {
  atom,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState
} from "recoil";

const currentSelectCategoryAtom = atom<string | null>({
  key: "currentSelectCategory",
  default: null
});

export const useCurrentSelectCategoryValue = () =>
  useRecoilValue(currentSelectCategoryAtom);
export const useCurrentSelectCategorySetter = () =>
  useSetRecoilState(currentSelectCategoryAtom);
export const useCurrentSelectCategoryReset = () =>
  useResetRecoilState(currentSelectCategoryAtom);
