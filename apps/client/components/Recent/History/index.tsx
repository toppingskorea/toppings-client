import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { Flex, margin, padding, Stack, touchable } from "@toss/emotion-utils";
import { MotionButton } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { hiddenScroll } from "~/styles/emotionUtils";
import useHistory from "./History.hooks";

const History = () => {
  const app = useHistory();

  if (app.recentHistories.pages[0].items.length === 0)
    return (
      <Flex.Center
        css={css`
          ${margin({
            top: 38
          })}
        `}
      >
        <Text
          _color={app.colors.secondary.A3}
          _fontSize={15}
          weight={app.weighs.bold}
        >
          No search history found
        </Text>
      </Flex.Center>
    );

  return (
    <Stack.Vertical
      as="ol"
      gutter={23}
      css={css`
        height: calc(100% - ${app.dimensions.bottomNavigationHeight}px);
        overflow-y: scroll;
        ${hiddenScroll}
        ${padding({
          x: 27,
          y: 16
        })}
      `}
    >
      {app.recentHistories.pages.map(page =>
        page.items.map(({ id, keyword, category, restaurantId }) => (
          <Flex key={id} justify="space-between" align="center" as="li">
            <Flex.Center
              onClick={() => {
                app.historyClickHandler(category, keyword, restaurantId);
              }}
              css={css`
                gap: 12px;
                ${touchable}
              `}
            >
              <Timeline />
              {keyword}
            </Flex.Center>

            <RemoveHistory
              onClick={() => app.deleteRecentHistoryMutate(id)}
              css={css`
                ${touchable}
              `}
            />
          </Flex>
        ))
      )}
      {!app.nextPageButtonHidden && (
        <MotionButton onClick={app.onMoreRecentHistoryClickHandler}>
          <Text _color={app.colors.primary} _fontSize={15}>
            More from recent history
          </Text>
        </MotionButton>
      )}
    </Stack.Vertical>
  );
};

export default History;
