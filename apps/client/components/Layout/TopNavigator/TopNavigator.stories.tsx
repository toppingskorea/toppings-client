import type { Meta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import TopNavigator from ".";

type Props = ComponentProps<typeof TopNavigator>;

const Template: Story<Props> = () => <TopNavigator />;

export const Default = Template.bind({});

Default.args = {};

export default {
  title: "TopNavigator",

  component: TopNavigator
} as Meta;
