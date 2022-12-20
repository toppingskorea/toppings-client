import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const currentSelectCategoryAtom = atom<string | null>({
  key: "currentSelectCategory",
  default: null
});

export const useCurrentSelectCategory = () =>
  useRecoilState(currentSelectCategoryAtom);
export const useCurrentSelectCategoryValue = () =>
  useRecoilValue(currentSelectCategoryAtom);
export const useCurrentSelectCategorySetter = () =>
  useSetRecoilState(currentSelectCategoryAtom);
