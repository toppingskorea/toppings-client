import { css, useTheme } from "@emotion/react";
import { flex, padding, SafeArea, Spacing } from "@toss/emotion-utils";
import { OrangeTypo, Text } from "~/components/Common/Typo";
import { Tag } from "~/components/Register/eatingHabits";
import { diets, religions } from "~/constants/data/common";
import { useSetNavigation } from "~/hooks";

const EatingHabits = () => {
  const theme = useTheme();
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
      )
    }
  });

  return (
    <SafeArea>
      <section
        css={css`
          ${flex({ direction: "column" })}
          ${padding({ x: 30 })}
        `}
      >
        <OrangeTypo>Diet</OrangeTypo>
        <Spacing size={13} />
        <ul
          css={css`
            display: flex;
            flex-wrap: wrap;
            column-gap: 2px;
            row-gap: 6px;
          `}
        >
          {diets.map(diet => (
            <Tag selected={false}>{diet}</Tag>
          ))}
        </ul>

        <Spacing size={39} />
        <OrangeTypo>Religion</OrangeTypo>
        <Spacing size={13} />
        <ul
          css={css`
            display: flex;
            flex-wrap: wrap;
            column-gap: 2px;
            row-gap: 6px;
          `}
        >
          {religions.map(religion => (
            <Tag selected={false}>{religion}</Tag>
          ))}
        </ul>
      </section>
    </SafeArea>
  );
};

export default EatingHabits;
