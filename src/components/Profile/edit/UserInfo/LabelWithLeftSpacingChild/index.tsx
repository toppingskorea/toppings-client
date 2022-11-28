import { css } from "@emotion/react";
import { Flex, Spacing, width100 } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import { ComponentWithLabel } from "~/components/Common";

interface Props {
  label: ComponentProps<typeof ComponentWithLabel>["label"];
  input: JSX.Element;
}

const LabelWithLeftSpacingChild = ({ label, input }: Props) => {
  return (
    <ComponentWithLabel label={label} gutter={9}>
      <Flex
        css={css`
          ${width100}
        `}
      >
        <Spacing size={3} direction="horizontal" />
        {input}
      </Flex>
    </ComponentWithLabel>
  );
};

export default LabelWithLeftSpacingChild;
