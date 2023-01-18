import { css, useTheme } from "@emotion/react";
import { Flex, padding, Spacing } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { OrangePersonIcon } from "~/assets/svgs/common";
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
        {/* TODO: 서버에서 사진 주면 프로필 사진 보여줄 수 있도록 */}
        <OrangePersonIcon />
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
