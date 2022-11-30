import { css } from "@emotion/react";
import { touchable } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import type { ComponentWithLabel } from "~/components/Common";
import { Input } from "~/components/Common";
import LabelWithLeftSpacingChild from "../LabelWithLeftSpacingChild";

interface Props {
  label: ComponentProps<typeof ComponentWithLabel>["label"];
  inputProps: Pick<ComponentProps<typeof Input>, "onClick" | "placeholder">;
}

const ClickableInput = ({ label, inputProps }: Props) => {
  return (
    <LabelWithLeftSpacingChild
      label={label}
      input={
        <Input
          height={39}
          readOnly
          css={css`
            ${touchable}
            font-size: 16px;
          `}
          {...inputProps}
        />
      }
    />
  );
};

export default ClickableInput;
