import { css, useTheme } from "@emotion/react";
import { flex, position } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { FilledButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInternalRouter } from "~/hooks";

const EditButton = () => {
  const { dimensions, colors } = useTheme();
  const { push } = useInternalRouter();

  return (
    <motion.div
      variants={defaultSlideFadeInVariants("bottom")}
      {...framerMocker}
      css={css`
        ${position("fixed", {
          bottom: dimensions.bottomNavigationHeight + 34,
          left: 0,
          right: 0
        })}
        ${flex({ justify: "center" })}
      `}
    >
      <FilledButton
        size={{
          width: 278,
          height: 37
        }}
        bgcolor={colors.primary}
        onClick={() => push("/profile/edit")}
      >
        <Text _fontSize={17} _color={colors.white}>
          Edit profile
        </Text>
      </FilledButton>
    </motion.div>
  );
};

export default EditButton;
