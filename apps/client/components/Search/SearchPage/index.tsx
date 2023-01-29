import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { Result } from "~/components/Search";
import { OpenGraph } from "~/components/Util";
import {
  useInput,
  useInternalRouter,
  useScrollToTopByKeywordChange,
  useSetNavigation
} from "~/hooks";

export type SearchType = "restaurant" | "local";

type Props = {
  type: SearchType;
};

const SearchPage = ({ type }: Props) => {
  const { colors, dimensions, weighs } = useTheme();
  const { push } = useInternalRouter();

  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          Restaurant Name
        </Text>
      ),
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
      <OpenGraph title={type} />
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
          placeholder="Enter the restaurant name"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </>
  );
};

export default SearchPage;
