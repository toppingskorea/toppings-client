import { useReviewUploadSetter } from "@atoms/review";
import { useTheme } from "@emotion/react";
import { Edit } from "@svgs/common";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";
import { useFetchReview } from "~/server/review";

const NavigationSetter = () => {
  const { weighs, colors } = useTheme();
  const { query, push } = useRouter();
  const reviewUploadSetter = useReviewUploadSetter();

  const { data: reviewDetail } = useFetchReview(Number(query.id));

  useSetNavigation({
    top: {
      title: (
        <Text
          _fontSize={18}
          weight={weighs.semiBold}
          _color={colors.secondary[47]}
        >
          {reviewDetail?.restaurantName}
        </Text>
      ),
      right: reviewDetail?.isMine
        ? {
            element: <Edit />,
            onClick: () => {
              reviewUploadSetter({ id: reviewDetail.id });
              push(`/review/add/${reviewDetail.restaurantId}`);
            }
          }
        : undefined
    },
    bottom: true
  });

  return null;
};

export default NavigationSetter;
