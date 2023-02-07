import { css, useTheme } from "@emotion/react";
import { Flex, padding, Stack } from "@toss/emotion-utils";
import { CircleCountry, PercentBar } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useFetchLikePercent } from "~/server/restaurant";
import EmptyText from "./Likes.styles";

interface Props {
  id: string;
}
const Likes = ({ id }: Props) => {
  const { colors, weighs } = useTheme();
  const { data: likePercent } = useFetchLikePercent(+id);

  if (!likePercent.countryPercent.length && !likePercent.habitPercent.length) {
    return <EmptyText />;
  }

  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      <Flex justify="space-between">
        <Text
          _fontSize={13}
          _color={colors.secondary[47]}
          weight={weighs.semiBold}
        >
          Nationality
        </Text>

        <Stack.Vertical gutter={6}>
          {likePercent.countryPercent.map((country, index) => (
            <PercentBar
              key={country.country}
              prepend={
                <CircleCountry
                  country={country.country}
                  size={14}
                  padding={4}
                  alt={`${country.country}'s country flag`}
                />
              }
              item={country}
              innerColor={index === 0 ? undefined : colors.secondary.A3}
            />
          ))}
        </Stack.Vertical>
      </Flex>

      <Flex justify="space-between">
        <Text
          _fontSize={13}
          _color={colors.secondary[47]}
          weight={weighs.semiBold}
        >
          Eating Habit
        </Text>

        <Stack.Vertical gutter={12} align="flex-end">
          {likePercent.habitPercent.map((habit, index) => (
            <PercentBar
              key={habit.habit}
              prepend={
                <Text
                  _fontSize={12}
                  _color={colors.secondary[83]}
                  weight={weighs.semiBold}
                >
                  {habit.habit}
                </Text>
              }
              item={habit}
              innerColor={index === 0 ? undefined : colors.secondary.A3}
            />
          ))}
        </Stack.Vertical>
      </Flex>
    </Stack.Vertical>
  );
};

export default Likes;
