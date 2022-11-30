import { css, useTheme } from "@emotion/react";
import { PrimaryTag } from "~/components/Common";
import types from "./HorizontalCategories.constants";

interface Props {
  value: string;
  onClick: (type: string) => void;
}

const HorizontalCategories = ({ value, onClick }: Props) => {
  const theme = useTheme();
  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;
        width: 500px;
        column-gap: 6px;
        row-gap: 8px;
      `}
    >
      {types.map(type => (
        <PrimaryTag
          key={type}
          selected={value === type}
          onClick={() => onClick(type)}
        >
          {type}
        </PrimaryTag>
      ))}
    </ul>
  );
};

export default HorizontalCategories;
