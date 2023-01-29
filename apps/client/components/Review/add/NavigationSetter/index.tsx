import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";
import { useFetchRestaurant } from "~/server/restaurant";

const NavigationSetter = () => {
  const { weighs, colors } = useTheme();
  const { query } = useRouter();

  const { data: restaurantDetail } = useFetchRestaurant(
    Number(query.restaurantId)
  );

  useSetNavigation({
    top: {
      title: (
        <Text
          _fontSize={19}
          _color={colors.secondary[47]}
          weight={weighs.semiBold}
        >
          {restaurantDetail.name}
        </Text>
      ),
      backButtonCaution: true
    }
  });

  return null;
};

export default NavigationSetter;
