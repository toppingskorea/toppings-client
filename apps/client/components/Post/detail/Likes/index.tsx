import { css, useTheme } from "@emotion/react";
import { Flex, padding, Stack } from "@toss/emotion-utils";
import Image from "next/image";
import { PercentBar } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { useFetchLikePercent } from "~/queries/restaurant";
import { countryToSvg } from "~/utils/country";

interface Props {
  id: string;
}
const Likes = ({ id }: Props) => {
  const { colors } = useTheme();
  const { data } = useFetchLikePercent(+id);

  return (
    <Stack.Vertical
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      <Flex justify="space-between">
        <Text _fontSize={13} _color={colors.secondary[47]}>
          Nationality
        </Text>

        <Stack.Vertical gutter={6}>
          {data.countryPercent.map((country, index) => (
            <PercentBar
              key={country.country}
              prepend={
                <Image
                  src={countryToSvg(country.country)}
                  width={20}
                  height={20}
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
        <Text _fontSize={13} _color={colors.secondary[47]}>
          Eating Habit
        </Text>

        <Stack.Vertical gutter={12} align="flex-end">
          {data.habitPercent.map((habit, index) => (
            <PercentBar
              key={habit.habit}
              prepend={
                <Text _fontSize={10} _color={colors.secondary[42]}>
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
