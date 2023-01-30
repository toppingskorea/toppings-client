import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import Button from "./Button";

type Props = ComponentProps<typeof Button>;

const Template: Story<Props> = args => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: {
    width: 150,
    height: 80
  },
  children: "TOPPINGS"
};

export default {
  title: "Common/Button/Button",
  component: Button
} as ComponentMeta<typeof Button>;
