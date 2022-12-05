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
          {data.countryPercent.map(country => (
            <PercentBar
              prepend={
                <Image
                  src={countryToSvg(country.country)}
                  width={20}
                  height={20}
                  alt={`${country.country}'s country flag`}
                />
              }
              item={country}
            />
          ))}
        </Stack.Vertical>
      </Flex>
      
      <Flex justify="space-between">
        <Text _fontSize={13} _color={colors.secondary[47]}>
          Eating Habit
        </Text>

        <Stack.Vertical gutter={12} align="flex-end">
          {data.habitPercent.map(habit => (
            <PercentBar
              prepend={
                <Text _fontSize={10} _color={colors.secondary[42]}>
                  {habit.habit}
                </Text>
              }
              item={habit}
            />
          ))}
        </Stack.Vertical>
      </Flex>
    </Stack.Vertical>
  );
};

export default Likes;
