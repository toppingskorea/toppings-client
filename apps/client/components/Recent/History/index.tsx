import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { Flex, flex, gutter, padding, touchable } from "@toss/emotion-utils";
import useHistory from "./History.hooks";

const History = () => {
  const app = useHistory();

  return (
    <div
      css={css`
        ${flex({ direction: "column" })}
        ${gutter("vertical", 23)}
        ${padding({
          x: 27
        })}
      `}
    >
      {app.recentHistories.map(({ id, keyword, category, restaurantId }) => (
        <Flex key={id} justify="space-between" align="center">
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
      ))}
    </div>
  );
};

export default History;
