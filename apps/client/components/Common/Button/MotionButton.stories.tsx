import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import MotionButton from "./MotionButton";

type Props = ComponentProps<typeof MotionButton>;

const Template: Story<Props> = args => <MotionButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "TOPPINGS"
};

export default {
  title: "Common/Button/MotionButton",
  component: MotionButton
} as ComponentMeta<typeof MotionButton>;
