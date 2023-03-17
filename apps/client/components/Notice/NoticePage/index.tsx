import { useTheme } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Skeleton } from "@toppings/components";
import { Stack } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";
import { fadeInVariants, framerMocker } from "~/constants";
import { useSetNavigation } from "~/hooks";
import { useNoticeActivateSetter } from "~/recoil/atoms/noticeActivate";
import { generateComponent } from "~/utils";
import NotificationList from "./NotificationList";

const Notice = () => {
  const { colors, weighs } = useTheme();
  const setNoticeActivate = useNoticeActivateSetter();

  useEffect(() => {
    setNoticeActivate(false);
    return () => setNoticeActivate(false);
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
        <motion.div {...framerMocker} variants={fadeInVariants(0.6)}>
          <NotificationList />
        </motion.div>
      </Suspense.CSROnly>
    </div>
  );
};

export default Notice;
