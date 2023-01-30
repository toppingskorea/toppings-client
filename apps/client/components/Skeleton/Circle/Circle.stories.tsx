import type { ComponentMeta, Story } from "@storybook/react";
import type { ComponentProps } from "react";
import Circle from ".";

type Props = ComponentProps<typeof Circle>;

const Template: Story<Props> = args => <Circle {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: 300
};

export default {
  title: "Skeleton/Circle",
  component: Circle
} as ComponentMeta<typeof Circle>;
