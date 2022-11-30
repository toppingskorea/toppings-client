import { css, useTheme } from "@emotion/react";
import { Exit } from "@svgs/common";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Badge,
  RoundedTag,
  SearchInput,
  SSRSafeSuspense
} from "~/components/Common";
import { History } from "~/components/Recent";
import { defaultSlideFadeInVariants, framerMocker } from "~/constants";
import { useInput, useSetNavigation } from "~/hooks";

const RecentPage = () => {
  const theme = useTheme();
  const [recentItems, setRecentItems] = useState<string[]>([]);

  useSetNavigation({
    top: {
      marginBottom: 85,
      right: <Exit />
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <motion.div
        variants={defaultSlideFadeInVariants("right")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, left: 0 })}
        `}
      >
        <Badge attach="left">Recent</Badge>
      </motion.div>
      <motion.div
        variants={defaultSlideFadeInVariants("left")}
        {...framerMocker}
        css={css`
          ${position("absolute", { top: 114, right: 0 })}
        `}
      >
        <RoundedTag
          padding={{
            x: 10,
            y: 6
          }}
          defaultProps={{
            bgColor: theme.colors.secondary.F1,
            bordercolor: "transparent",
            _color: theme.colors.secondary.A2
          }}
          _fontSize={13}
        >
          remove all
        </RoundedTag>
      </motion.div>

      <SSRSafeSuspense fallback={<div>하이</div>}>
        <History recentItems={recentItems} />
      </SSRSafeSuspense>

      <div
        css={css`
          ${position("fixed", {
            bottom: theme.dimensions.bottomNavigationHeight
          })}
        `}
      >
        <ul
          css={css`
            display: flex;
            gap: 20px;
            white-space: nowrap;
            overflow-x: auto;
          `}
        >
          {["Restaurant", "Nationality", "Eating  habit"].map(item => (
            <RoundedTag
              key={item}
              padding={{
                x: 16,
                y: 7
              }}
              _fontSize={17}
              defaultProps={{
                bgColor: theme.colors.white,
                bordercolor: theme.colors.secondary.D9
              }}
            >
              {item}
            </RoundedTag>
          ))}
        </ul>
      </div>

      <div
        css={css`
          ${padding({ x: 16, y: 22 })};
          ${position("fixed", { bottom: 0 })}
          background-color: ${theme.colors.white};
          max-width: ${theme.dimensions.viewWidth - 32}px;
          ${width100}
        `}
      >
        <SearchInput
          onSubmit={() => setRecentItems(prev => [...prev, keyword.value])}
          placeholder="Enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </SafeArea>
  );
};

export default RecentPage;
