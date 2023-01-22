import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { Flex, padding, Stack, touchable } from "@toss/emotion-utils";
import useHistory from "./History.hooks";

const History = () => {
  const app = useHistory();

  return (
    <Stack.Vertical
      as="ol"
      gutter={23}
      css={css`
        ${padding({
          x: 27,
          y: 16
        })}
      `}
    >
      {app.recentHistories.items.map(
        ({ id, keyword, category, restaurantId }) => (
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
        )
      )}
    </Stack.Vertical>
  );
};

export default History;
