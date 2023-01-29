import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import Paragraph from ".";

type Props = ComponentProps<typeof Paragraph>;

const Template: Story<Props> = args => <Paragraph {...args} />;

export const Default = Template.bind({});

Default.args = {};

export default {
  title: "Skeleton/Paragraph",
  component: Paragraph
} as ComponentMeta<typeof Paragraph>;
