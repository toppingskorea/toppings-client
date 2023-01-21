import { useTheme } from "@emotion/react";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";

const Notice = () => {
  const { colors, weighs } = useTheme();

  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          Notifications
        </Text>
      )
    },
    bottom: true
  });
  return <div>notice</div>;
};

export default Notice;
