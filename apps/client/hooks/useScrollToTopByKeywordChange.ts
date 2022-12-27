import { useEffect } from "react";
import { useScrollContainer } from "~/components/Common";

const useScrollToTopByKeywordChange = (keyword: string) => {
  const { scrollToTop } = useScrollContainer();

  useEffect(() => {
    if (keyword) {
      scrollToTop();
    }
  }, [keyword, scrollToTop]);
};

export default useScrollToTopByKeywordChange;
