import { useNavigationSetter } from "@atoms/index";
import type { ComponentMeta, Story } from "@storybook/react";
import { Edit } from "@svgs/common";
import type { MouseEventHandler } from "react";
import TopNavigator from ".";

const Template: Story = ({
  title,
  right,
  marginBottom,
  hideBackButton,
  backButtonCaution
}: {
  title?: JSX.Element;
  right?: {
    element: JSX.Element;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
  marginBottom?: Common.CSSPixelValue;
  hideBackButton?: true;
  backButtonCaution?: boolean;
}) => {
  const setNavigation = useNavigationSetter();

  setNavigation({
    top: {
      title,
      right,
      marginBottom,
      hideBackButton,
      backButtonCaution
    }
  });
  return <TopNavigator />;
};

export const Default = Template.bind({});

Default.args = {
  title: <div>This is title</div>,
  marginBottom: 24,
  hideBackButton: undefined,
  backButtonCaution: true,
  right: {
    element: <Edit />,
    onClick: () => console.log("clicked")
  }
};

export default {
  title: "Layout/TopNavigator",
  component: TopNavigator
} as ComponentMeta<typeof TopNavigator>;
