import { css } from "@emotion/react";
import { Suspense } from "@suspensive/react";
import { Hamburger } from "@svgs/common";
import { Skeleton } from "@toppings/components";
import { padding, Stack } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { fadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter, useSetNavigation } from "~/hooks";
import { generateComponent } from "~/utils";
import EditButton from "./EditButton";
import Info from "./Info";

const ProfilePage = () => {
  const { push } = useInternalRouter();
  useSetNavigation({
    top: {
      right: {
        element: <Hamburger />,
        onClick: () => push("/profile/menu")
      },
      title: (
        <Skeleton.Box
          size={{
            width: 60,
            height: 20
          }}
        />
      ),
      marginBottom: 33
    },
    bottom: true
  });

  return (
    <section
      css={css`
        ${padding({ x: 25 })}
      `}
    >
      <Suspense.CSROnly
        fallback={
          <Stack.Vertical>
            <Stack.Horizontal align="center" gutter={220}>
              <Skeleton.Circle size={78} />

              <Stack.Horizontal>
                {generateComponent(
                  <Skeleton.Box
                    size={{
                      width: 50,
                      height: 50
                    }}
                  />,
                  3
                )}
              </Stack.Horizontal>
            </Stack.Horizontal>

            <Stack.Vertical>
              {generateComponent(<Skeleton.Paragraph />, 2)}
            </Stack.Vertical>
          </Stack.Vertical>
        }
      >
        <motion.div {...framerMocker} variants={fadeInVariants(0.6)}>
          <Info />
        </motion.div>
      </Suspense.CSROnly>

      <EditButton />
    </section>
  );
};
export default ProfilePage;
