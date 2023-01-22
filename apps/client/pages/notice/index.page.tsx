import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";
import { useNoticeActivateSetter } from "~/recoil/atoms/noticeActivate";

const Notice = () => {
  const { colors, weighs } = useTheme();
  const setNoticeActivate = useNoticeActivateSetter();

  useEffect(() => {
    setNoticeActivate(false);
  }, [setNoticeActivate]);

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
