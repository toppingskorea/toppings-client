import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, flex, touchable } from "@toss/emotion-utils";
import { memo } from "react";
import { useDeleteRecentHistory } from "~/mutations/recent";
import { useFetchRecentHistory } from "~/queries/recent";
import Keys from "~/queries/recent/keys";

const History = () => {
  const queryClient = useQueryClient();
  const { data } = useFetchRecentHistory();
  const { mutate } = useDeleteRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  return (
    <div
      css={css`
        ${flex({ direction: "column" })}
        margin-left: 27px;
      `}
    >
      {data.map(({ id, keyword }) => (
        <Flex key={id} justify="space-between">
          <Flex.Center>
            <Timeline />
            {keyword}
          </Flex.Center>
          <RemoveHistory
            onClick={() => mutate(id)}
            css={css`
              ${touchable}
            `}
          />
        </Flex>
      ))}
    </div>
  );
};

export default memo(History);
