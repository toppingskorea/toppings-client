import { css, useTheme } from "@emotion/react";
import { size, Stack } from "@toss/emotion-utils";
import { emotionTheme } from "~/styles";
import { Text } from "../Typo";

interface Props {
  prepend: JSX.Element;
  item: Common.PercentDTO;
  innerColor?:
    | typeof emotionTheme.colors.primary
    | typeof emotionTheme.colors.secondary["A3"];
}

const PercentBar = ({
  prepend,
  item,
  innerColor = emotionTheme.colors.primary
}: Props) => {
  const { colors } = useTheme();

  return (
    <Stack.Horizontal gutter={10} align="center">
      {prepend}

      <div
        css={css`
          ${size({
            width: 124,
            height: 8
          })}
          border-radius: 100px;
          background-color: ${colors.secondary.E2};
        `}
      >
        <div
          css={css`
            ${size({
              width: `${item.percent}%`,
              height: 8
            })}
            border-radius: 100px;
            background-color: ${innerColor};
          `}
        />
      </div>

      <Text _fontSize={10} _color={colors.secondary[42]}>
        {item.percent}%({item.count})
      </Text>
    </Stack.Horizontal>
  );
};

export default PercentBar;
