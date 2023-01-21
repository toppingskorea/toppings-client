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

const currentHabitTitleAtom = atom<"Diet" | "Religion">({
  key: "currentHabitTitleAtom",
  default: "Diet"
});

export const useCurrentHabitTitleValue = () =>
  useRecoilValue(currentHabitTitleAtom);
export const useCurrentHabitTitleSetter = () =>
  useSetRecoilState(currentHabitTitleAtom);
export const useCurrentHabitTitleReset = () =>
  useResetRecoilState(currentHabitTitleAtom);

const currentSelectCategoryAtom = atom<string>({
  key: "currentSelectCategory",
  default: ""
});

export const useCurrentSelectCategory = () =>
  useRecoilState(currentSelectCategoryAtom);
export const useCurrentSelectCategoryValue = () =>
  useRecoilValue(currentSelectCategoryAtom);
export const useCurrentSelectCategorySetter = () =>
  useSetRecoilState(currentSelectCategoryAtom);
export const useCurrentSelectCategoryReset = () =>
  useResetRecoilState(currentSelectCategoryAtom);

const searchByFilteringAtom = atom<Restaurant.SearchByFilteringDTO[]>({
  key: "searchByFilteringAtom",
  default: undefined
});

export const useSearchByFilteringState = () =>
  useRecoilState(searchByFilteringAtom);
export const useSearchByFilteringValue = () =>
  useRecoilValue(searchByFilteringAtom);
export const useSearchByFilteringSetter = () =>
  useSetRecoilState(searchByFilteringAtom);
export const useSearchByFilteringReset = () =>
  useResetRecoilState(searchByFilteringAtom);
