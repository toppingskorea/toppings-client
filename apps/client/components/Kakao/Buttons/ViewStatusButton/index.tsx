import { useTheme } from "@emotion/react";
import { Spacing } from "@toss/emotion-utils";
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

      <Spacing size={19} direction="horizontal" />

      <Text
        _fontSize={15}
        weight={weighs.medium}
        _color={colors.secondary["6D"]}
      >
        {text}
      </Text>
    </Button>
  );
};
