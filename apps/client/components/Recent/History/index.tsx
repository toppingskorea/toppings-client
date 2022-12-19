import { css } from "@emotion/react";
import { RemoveHistory, Timeline } from "@svgs/recent";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, flex, gutter, padding, touchable } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { useDeleteRecentHistory } from "~/mutations/recent";
import { useFetchRecentHistory } from "~/queries/recent";
import Keys from "~/queries/recent/keys";

const History = () => {
  const { push } = useRouter();
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
        ${gutter("vertical", 23)}
        ${padding({
          x: 27
        })}
      `}
    >
      {data.map(({ id, keyword, category }) => (
        <Flex key={id} justify="space-between" align="center">
          <Flex.Center
            onClick={() => {
              if (category === "Name") push(`/post/${id}`);
            }}
            css={css`
              gap: 12px;
            `}
          >
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

export default History;
