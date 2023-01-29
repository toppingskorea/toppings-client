import { useTheme } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Exit } from "@svgs/common";
import { Stack } from "@toss/emotion-utils";
import { Text } from "~/components/Common/Typo";
import { NotificationList } from "~/components/Notice";
import Skeleton from "~/components/Skeleton";
import { OpenGraph } from "~/components/Util";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";

const Notice = () => {
  const { colors, weighs } = useTheme();
  const { back } = useInternalRouter();
  // const setNoticeActivate = useNoticeActivateSetter();

  // useEffect(() => {
  //   setNoticeActivate(false);
  //   return () => setNoticeActivate(false);
  // }, [setNoticeActivate]);

  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} weight={weighs.bold} _color={colors.secondary[47]}>
          Notifications
        </Text>
      ),
      hideBackButton: true,
      right: {
        element: <Exit />,
        onClick: back
      }
    },
    bottom: true
  });
  return (
    <div>
      <OpenGraph title="Notice" />
      <Suspense.CSROnly
        fallback={
          <Stack.Vertical>
            {generateComponent(
              <Skeleton.Box
                size={{
                  width: "100%",
                  height: 40
                }}
              />,
              6
            )}
          </Stack.Vertical>
        }
      >
        <NotificationList />
      </Suspense.CSROnly>
    </div>
  );
};

export default Notice;
