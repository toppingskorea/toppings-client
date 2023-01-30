import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import Badge from ".";

type Props = ComponentProps<typeof Badge>;

const Template: Story<Props> = args => <Badge {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "toppings",
  size: { width: 128, height: 35 }
};

export default {
  title: "Common/Badge",
  component: Badge
} as ComponentMeta<typeof Badge>;
