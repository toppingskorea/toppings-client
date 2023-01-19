import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";
import { useFetchReview } from "~/server/review";

const NavigationSetter = () => {
  const { weighs, colors } = useTheme();
  const { query } = useRouter();

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
      )
    },
    bottom: true
  });

  return null;
};

export default NavigationSetter;
