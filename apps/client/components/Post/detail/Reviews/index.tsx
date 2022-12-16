import { css, useTheme } from "@emotion/react";
import { avatar } from "@images/profile";
import { Flex, padding, Spacing, Stack, width100 } from "@toss/emotion-utils";
import Image from "next/image";
import { Text } from "~/components/Common/Typo";
import { useFetchReviews } from "~/queries/restaurant";
import { countryToSvg } from "~/utils/country";

interface Props {
  id: string;
}
const Reviews = ({ id }: Props) => {
  const { colors, weighs } = useTheme();
  const { data } = useFetchReviews(+id);

  return (
    <Stack.Vertical
      as="ul"
      css={css`
        ${padding({ x: 24 })}
      `}
    >
      {data.map(review => (
        <li key={review.id}>
          <Flex>
            <Image
              src={
                review.thumbnail.includes("data") ? review.thumbnail : avatar
              }
              alt=""
              width={64}
              height={64}
              css={css`
                border-radius: 8px;
              `}
            />

            <Spacing direction="horizontal" size={10} />
            <Flex
              direction="column"
              css={css`
                ${width100}
              `}
            >
              <Flex justify="space-between" align="center">
                <Flex align="center">
                  <Image
                    src={countryToSvg(review.country)}
                    alt=""
                    width={16}
                    height={24}
                    css={css`
                      border-radius: 8px;
                    `}
                  />
                  <Spacing direction="horizontal" size={4} />
                  <Text _fontSize={13} weight={weighs.semiBold}>
                    {review.name}
                  </Text>
                </Flex>
                <Text _fontSize={10} _color={colors.secondary.B8}>
                  {review.modifiedAt}
                </Text>
              </Flex>

              <Spacing size={4} />
              <Text _fontSize={10} _color={colors.secondary[34]}>
                {review.description}
              </Text>
            </Flex>
          </Flex>
        </li>
      ))}
    </Stack.Vertical>
  );
};

export default Reviews;
