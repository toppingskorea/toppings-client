import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import FilledButton from "./FilledButton";

type Props = ComponentProps<typeof FilledButton>;

const Template: Story<Props> = args => <FilledButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: {
    width: 150,
    height: 40
  },
  bgcolor: "#343434",
  children: "TOPPINGS"
};

export default {
  title: "Common/Button/FilledButton",
  component: FilledButton
} as ComponentMeta<typeof FilledButton>;
