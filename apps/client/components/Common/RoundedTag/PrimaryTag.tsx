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
  const theme = useTheme();

  return (
    <ClickableRoundedTag
      _fontSize={15}
      paddingX={19}
      defaultProps={{
        _color: theme.colors.secondary[69],
        bgcolor: theme.colors.white,
        bordercolor: theme.colors.secondary.D9
      }}
      selectedProps={{
        _color: theme.colors.white,
        bgcolor: theme.colors.dim.orange,
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
