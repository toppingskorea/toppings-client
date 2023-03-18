import { css, useTheme } from "@emotion/react";
import type { FC, SVGProps } from "react";
import { Text } from "~/components/Common/Typo";
import { defaultScaleChangeVariants, framerMocker } from "~/constants";
import { Button } from "./ViewStatusButton.styles";

interface Props {
  onClick: VoidFunction;
  text: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
}

export const ViewStatusButton = ({ onClick, text, Icon }: Props) => {
  const { colors, weighs } = useTheme();

  return (
    <Button
      type="button"
      variants={defaultScaleChangeVariants}
      onClick={onClick}
      {...framerMocker}
    >
      <Icon />
      <Text
        _fontSize={15}
        weight={weighs.medium}
        _color={colors.secondary["6D"]}
        css={css`
          margin-left: 19px;
        `}
      >
        {text}
      </Text>
    </Button>
  );
};
