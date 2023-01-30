import { css } from "@emotion/react";
import type { ComponentMeta, Story } from "@storybook/react";
import { Flex } from "@toss/emotion-utils";
import type { ComponentProps } from "react";
import Seek from ".";

type Props = ComponentProps<typeof Seek>;

const Template: Story<Props> = args => (
  <Flex.Center
    css={css`
      background-color: orange;
    `}
  >
    <Seek {...args} />
  </Flex.Center>
);
export const Default = Template.bind({});

Default.args = {};

export default {
  title: "Common/LoadingIndicator/Seek",
  component: Seek
} as ComponentMeta<typeof Seek>;
