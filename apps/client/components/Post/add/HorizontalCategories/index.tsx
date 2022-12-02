import { css, useTheme } from "@emotion/react";
import { PrimaryTag } from "~/components/Common";
import { types } from "~/constants/data/common";

interface Props {
  value?: Util.ElementType<typeof types>["label"];
  onClick: (type: Util.ElementType<typeof types>["label"]) => void;
}

const HorizontalCategories = ({ value, onClick }: Props) => {
  const { dimensions } = useTheme();

  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;
        width: ${dimensions.viewWidth}px;
        column-gap: 6px;
        row-gap: 8px;
      `}
    >
      {types.map(({ label }) => (
        <PrimaryTag
          key={label}
          selected={value === label}
          onClick={() => onClick(label)}
        >
          {label}
        </PrimaryTag>
      ))}
    </ul>
  );
};

export default HorizontalCategories;
