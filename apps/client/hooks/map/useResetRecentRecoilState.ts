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

  const executeResetAll = () => {
    currentSelectCategoryReset();
    currentHabitTitleReset();
    currentSelectKeywordReset();
    searchByFilteringReset();
  };

  return {
    executeResetAll
  };
};

export default useResetRecentRecoilState;