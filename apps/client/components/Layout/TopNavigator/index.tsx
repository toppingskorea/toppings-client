import { useNavigationValue } from "@atoms/index";
import { LeftArrow } from "@svgs/common";
import { Flex, Spacing } from "@toss/emotion-utils";
import { AnimatePresence } from "framer-motion";
import { MotionButton } from "~/components/Common";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useClickBackButton } from "./TopNavigator.hooks";
import { Header, Nav, Title } from "./TopNavigator.styles";

const TopNavigator = () => {
  const state = useNavigationValue();

  const { onClickBackButton } = useClickBackButton();

  return (
    <AnimatePresence>
      <Header>
        <Nav paddingBottom={state.top?.marginBottom}>
          {state.top?.hideBackButton && !state.top.right ? (
            <Spacing size={28} />
          ) : (
            <Flex justify="space-between">
              {state.top?.hideBackButton ? (
                <div id="dummy-element" />
              ) : (
                <MotionButton onClick={onClickBackButton}>
                  <LeftArrow />
                </MotionButton>
              )}

              {state.top?.right ? (
                <MotionButton onClick={state.top.right.onClick}>
                  {state.top?.right.element}
                </MotionButton>
              ) : (
                <Spacing size={0} />
              )}
            </Flex>
          )}

          {state.top?.title && (
            <Title
              variants={defaultSlideFadeInVariants("bottom")}
              {...framerMocker}
            >
              {state.top?.title}
            </Title>
          )}
        </Nav>
      </Header>
    </AnimatePresence>
  );
};

export default TopNavigator;
