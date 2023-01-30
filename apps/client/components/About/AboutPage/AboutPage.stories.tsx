import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import AboutPage from ".";

type Props = ComponentProps<typeof AboutPage>;

const Template: Story<Props> = () => <AboutPage />;

export const Default = Template.bind({});

Default.args = {};

export default {
  title: "About/AboutPage",
  component: AboutPage
} as ComponentMeta<typeof AboutPage>;
