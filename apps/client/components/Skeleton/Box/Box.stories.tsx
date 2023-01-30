import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import Box from ".";

type Props = ComponentProps<typeof Box>;

const Template: Story<Props> = args => <Box {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: {
    width: 100,
    height: 100
  }
};

export default {
  title: "Skeleton/Box",
  component: Box
} as ComponentMeta<typeof Box>;
