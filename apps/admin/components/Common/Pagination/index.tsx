import { HStack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPage: number;
}

const Pagination = ({ currentPage, setCurrentPage, totalPage }: Props) => {
  return (
    <HStack
      css={css`
        font-size: 36px;
      `}
    >
      <button
        type="button"
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(currentPage - 1)}
        title="이전 목록 보기"
      >
        {"<"}
      </button>
      <span
        css={css`
          font-style: italic;
        `}
      >
        {currentPage + 1} / {totalPage}
      </span>

      <button
        type="button"
        disabled={currentPage === totalPage - 1}
        title="다음 목록 보기"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {">"}
      </button>
    </HStack>
  );
};

export default Pagination;
