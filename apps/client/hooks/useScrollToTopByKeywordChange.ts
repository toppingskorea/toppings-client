import { useEffect } from "react";
import { useScrollContainer } from "~/components/Common";

export const useScrollToTopByKeywordChange = (keyword: string) => {
  const { scrollToTop } = useScrollContainer();

  useEffect(() => {
    if (keyword) {
      scrollToTop();
    }
  }, [keyword, scrollToTop]);
};
