import { useNavigationValue } from "@atoms/index";
import { LeftArrow } from "@svgs/common";
import { Flex, Spacing } from "@toss/emotion-utils";
import { AnimatePresence } from "framer-motion";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useClickBackButton } from "./TopNavigator.hooks";
import { Header, Nav, PaddedMotionButton, Title } from "./TopNavigator.styles";

const TopNavigator = () => {
  const state = useNavigationValue();

  const { onClickBackButton } = useClickBackButton();

  return (
    <AnimatePresence>
      <Header>
        <Nav>
          {state.top?.hideBackButton && !state.top.right ? (
            <Spacing size={28} />
          ) : (
            <Flex justify="space-between">
              {state.top?.hideBackButton ? (
                <div id="dummy-element" />
              ) : (
                <PaddedMotionButton
                  onClick={onClickBackButton}
                  paddingBottom={state.top?.marginBottom}
                >
                  <LeftArrow />
                </PaddedMotionButton>
              )}

              {state.top?.right ? (
                <PaddedMotionButton
                  onClick={state.top.right.onClick}
                  paddingBottom={state.top?.marginBottom}
                >
                  {state.top?.right.element}
                </PaddedMotionButton>
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
