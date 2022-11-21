import { css, useTheme } from "@emotion/react";
import {
  Flex,
  flex,
  gutter,
  padding,
  position,
  SafeArea,
  size,
  Spacing
} from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { check } from "~/assets/json";
import { Badge } from "~/components/Common";
import { OrangeTypo, Text } from "~/components/Common/Typo";
import { Tag } from "~/components/Register/eatingHabits";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { diets, religions } from "~/constants/data/common";
import { useSetNavigation } from "~/hooks";
import { useRegister } from "~/mutations/register";
import { useRegisterState } from "~/recoil/atoms";
import habitTitleList from "./eatingHabits.constants";

const EatingHabits = () => {
  const theme = useTheme();
  const { mutate } = useRegister();
  const [register, setRegister] = useRegisterState();

  const overlay = useOverlay();

  useSetNavigation({
    top: {
      marginBottom: 35,
      title: (
        <Text
          _fontSize={23}
          weight={theme.weighs.bold}
          _color={theme.colors.secondary[47]}
        >
          Select a Eating Habit
        </Text>
      ),
      right: (
        <Text _fontSize={15} _color={theme.colors.secondary[69]}>
          Skip
        </Text>
      )
    }
  });

  const openSuccessModal = () => {
    overlay.open(() => (
      <Flex.Center
        direction="column"
        css={css`
          ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
          ${size.full}
          ${gutter({ direction: "vertical", space: 30 })}
          background-color: ${theme.colors.white};
        `}
      >
        <Lottie
          loop
          autoplay
          animationData={check}
          css={css`
            ${size({ width: 42, height: 42 })}
          `}
        />

        <Text
          _fontSize={23}
          weight={theme.weighs.heavy}
          _color={theme.colors.secondary[47]}
        >
          Complete!
        </Text>
      </Flex.Center>
    ));
  };

  return (
    <SafeArea>
      <section
        css={css`
          ${flex({ direction: "column" })}
          ${padding({ x: 30 })}
          ${gutter({ direction: "vertical", space: 39 })}
        `}
      >
        {habitTitleList.map(habit => (
          <Flex direction="column" key={habit}>
            <OrangeTypo>{habit}</OrangeTypo>
            <Spacing size={13} />
            <ul
              css={css`
                display: flex;
                flex-wrap: wrap;
                column-gap: 2px;
                row-gap: 6px;
              `}
            >
              {(habit === "Diet" ? diets : religions).map(content => (
                <Tag
                  key={content}
                  selected={register.habit?.content === content}
                  onClick={() => {
                    setRegister({
                      ...register,
                      habit: {
                        title: habit,
                        content
                      }
                    });
                  }}
                >
                  {content}
                </Tag>
              ))}
            </ul>
          </Flex>
        ))}
      </section>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { bottom: 44, right: 0 })}
        `}
        onClick={openSuccessModal}
      >
        <Badge attach="right">Next</Badge>
      </motion.div>
    </SafeArea>
  );
};

export default EatingHabits;
