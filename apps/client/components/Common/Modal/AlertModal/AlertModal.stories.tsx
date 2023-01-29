import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import AlertModal from ".";

type Props = ComponentProps<typeof AlertModal>;

const Template: Story<Props> = args => <AlertModal {...args} />;

export const TwoOptions = Template.bind({});
export const OneOption = Template.bind({});

TwoOptions.args = {
  exitFn: () => console.log("exit button clicked"),
  rightClick: {
    fn: () => console.log("right button clicked"),
    text: "sure"
  }
};

OneOption.args = {
  exitFn: () => console.log("exit button clicked"),
  information: "This is information"
};

export default {
  title: "AlertModal",
  component: AlertModal
} as ComponentMeta<typeof AlertModal>;
