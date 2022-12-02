import { useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import { ClickableRoundedTag } from "~/components/Common";

const PrimaryTag = ({
  children,
  selected,
  onClick
}: Pick<
  ComponentProps<typeof ClickableRoundedTag>,
  "children" | "selected" | "onClick"
>) => {
  const { colors } = useTheme();

  return (
    <ClickableRoundedTag
      _fontSize={15}
      paddingX={19}
      defaultProps={{
        _color: colors.secondary[69],
        bgcolor: colors.white,
        bordercolor: colors.secondary.D9
      }}
      selectedProps={{
        _color: colors.white,
        bgcolor: colors.dim.orange,
        bordercolor: "transparent"
      }}
      selected={selected}
      onClick={onClick}
    >
      {children}
    </ClickableRoundedTag>
  );
};

export default PrimaryTag;
