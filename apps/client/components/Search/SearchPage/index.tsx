import { css, useTheme } from "@emotion/react";
import { useInput } from "@toppings/hooks";
import { padding, position, width100 } from "@toss/emotion-utils";
import { SearchInput } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { Result } from "~/components/Search";
import { OpenGraph } from "~/components/Util";
import { useDeviceInfo } from "~/contexts";
import { useBlurController, useSetNavigation } from "~/hooks";

export type SearchType = "restaurant" | "local";

type Props = {
  type: SearchType;
};

const SearchPage = ({ type }: Props) => {
  const { colors, dimensions, weighs } = useTheme();
  const { isIos } = useDeviceInfo();

  const {
    props: keyword,
    debouncedValue,
    setValue
  } = useInput({
    initialValue: "",
    useDebounce: true,
    debounceTimeout: 300
  });

  const { focusController, isFocused } = useBlurController();

  const isIosFocused = isIos && isFocused;

  useSetNavigation({
    top: isIosFocused
      ? undefined
      : {
          title: (
            <Text
              _fontSize={19}
              _color={colors.secondary[47]}
              weight={weighs.bold}
            >
              Restaurant Name
            </Text>
          ),
          marginBottom: 35
        }
  });

  return (
    <>
      <OpenGraph title={type} />
      <section
        css={css`
          ${padding({ x: 16, bottom: 75 })}
          ${isIosFocused &&
          position("fixed", {
            top: 0
          })}
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
          {...focusController}
        />
      </div>
    </>
  );
};

export default SearchPage;
