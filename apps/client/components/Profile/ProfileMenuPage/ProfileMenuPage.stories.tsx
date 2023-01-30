import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import ProfileMenuPage from ".";

type Props = ComponentProps<typeof ProfileMenuPage>;

const Template: Story<Props> = () => <ProfileMenuPage />;

export const Default = Template.bind({});

Default.args = {};

export default {
  title: "Profile/ProfileMenuPage",
  component: ProfileMenuPage
} as ComponentMeta<typeof ProfileMenuPage>;
