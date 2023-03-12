import { css } from "@emotion/react";
import { position } from "@toss/emotion-utils";
import { motion } from "framer-motion";

import { Badge } from "~/components/Common";
import { SelectEatingHabit } from "~/components/Section";
import { OpenGraph } from "~/components/Util";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import {
  useRegisterInfoState,
  useSetNavigation,
  useSubmitRegister,
  useTagClick
} from "./RegisterEatingHabitsPage.hooks";

const EatingHabitsPage = () => {
  useSetNavigation();

  const { onSubmitRegister } = useSubmitRegister();
  const { onTagClickHandler } = useTagClick();
  const { habits } = useRegisterInfoState();

  return (
    <>
      <OpenGraph title="Register Eating Habits" />
      <SelectEatingHabit onClick={onTagClickHandler} habits={habits} />

      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { bottom: 44, right: 0 })}
        `}
        onClick={onSubmitRegister}
      >
        <Badge attach="right">Next</Badge>
      </motion.div>
    </>
  );
};

export default EatingHabitsPage;
