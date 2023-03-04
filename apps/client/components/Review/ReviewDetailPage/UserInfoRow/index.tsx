import { css, useTheme } from "@emotion/react";
import { OrangePersonIcon } from "@svgs/common";
import { Flex, padding, Spacing } from "@toss/emotion-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { useFetchReview } from "~/server/review";

const UserInfoRow = () => {
  const { weighs, colors } = useTheme();
  const { query } = useRouter();
  const { data: reviewDetail } = useFetchReview(Number(query.id));

  if (!reviewDetail) return <div>잠시후 다시 시도해주세요.</div>;

  return (
    <Flex
      align="flex-end"
      justify="space-between"
      css={css`
        ${padding({ x: 17 })}
      `}
    >
      <Flex align="center">
        {reviewDetail.userProfile ? (
          <Image
            src={reviewDetail.userProfile}
            alt={`${reviewDetail.name} 님의 프로필`}
            width={32}
            height={32}
            css={css`
              object-fit: cover;
              border-radius: 50%;
            `}
          />
        ) : (
          <OrangePersonIcon />
        )}
        <Spacing direction="horizontal" size={12} />

        <Flex direction="column">
          <Text _fontSize={14} weight={weighs.semiBold} lineHeight={17}>
            {reviewDetail.name}
          </Text>
          <Text _fontSize={12} lineHeight={14} _color={colors.secondary[69]}>
            {reviewDetail.habits[0]}
          </Text>
        </Flex>
      </Flex>

      <Text _fontSize={10} lineHeight={14} _color={colors.secondary[52]}>
        {reviewDetail.modifiedAt}
      </Text>
    </Flex>
  );
};

export default UserInfoRow;
