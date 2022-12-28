import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, width100 } from "@toss/emotion-utils";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SearchInput } from "~/components/Common";
import { Result } from "~/components/Search";
import {
  useInput,
  useInternalRouter,
  useScrollToTopByKeywordChange,
  useSetNavigation
} from "~/hooks";

export type SearchType = "restaurant" | "local";

const Search = ({
  type
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { colors, dimensions } = useTheme();
  const { push } = useInternalRouter();

  useSetNavigation({
    top: {
      marginBottom: 35,
      right: {
        element: <Exit />,
        onClick: () => push("/map")
      }
    }
  });

  const {
    props: keyword,
    debouncedValue,
    setValue
  } = useInput({
    initialValue: "",
    useDebounce: true,
    debounceTimeout: 300
  });

  useScrollToTopByKeywordChange(keyword.value);

  return (
    <>
      <section
        css={css`
          ${padding({ x: 16 })}
        `}
      >
        <Result value={debouncedValue} type={type} />
      </section>
      <div
        css={css`
          ${position("fixed", { bottom: 0 })}
          ${padding({ x: 16, y: 22 })};
          background-color: ${colors.white};
          max-width: ${dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => console.log("sad")}
          placeholder="Search for a nationality"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  type: SearchType;
}> = async context => ({
  props: {
    type: context.query.type as SearchType
  }
});

export default Search;
