import {
  useCurrentHabitTitleReset,
  useCurrentSelectCategoryReset,
  useCurrentSelectKeywordReset,
  useSearchByFilteringReset
} from "~/recoil/atoms";

const useResetRecentRecoilState = () => {
  const currentSelectCategoryReset = useCurrentSelectCategoryReset();
  const currentHabitTitleReset = useCurrentHabitTitleReset();
  const currentSelectKeywordReset = useCurrentSelectKeywordReset();
  const searchByFilteringReset = useSearchByFilteringReset();

  const executeReset = () => {
    currentSelectCategoryReset();
    currentHabitTitleReset();
    currentSelectKeywordReset();
    searchByFilteringReset();
  };

  return {
    executeReset
  };
};

export default useResetRecentRecoilState;
