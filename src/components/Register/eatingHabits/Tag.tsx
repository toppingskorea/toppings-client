import { useTheme } from "@emotion/react";
import type { ComponentProps } from "react";
import { RoundedTag } from "~/components/Common";

const Tag = ({
  children,
  selected
}: Pick<ComponentProps<typeof RoundedTag>, "children" | "selected">) => {
  const theme = useTheme();
  return (
    <RoundedTag
      _fontSize={15}
      paddingX={19}
      defaultProps={{
        _color: theme.colors.secondary[69],
        bgColor: theme.colors.white,
        borderColor: theme.colors.secondary.D9
      }}
      selectedProps={{
        _color: theme.colors.white,
        bgColor: theme.colors.dim.orange,
        borderColor: "transparent"
      }}
      selected={selected}
    >
      {children}
    </RoundedTag>
  );
};

export default Tag;
