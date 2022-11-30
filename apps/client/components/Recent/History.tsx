import { css } from "@emotion/react";
import { flex } from "@toss/emotion-utils";
import { Timeline } from "~/assets/svgs/recent";
import { useFetchRecentHistory } from "~/queries/recent";

interface Props {
  recentItems: string[];
}

const History = ({ recentItems }: Props) => {
  const { data } = useFetchRecentHistory();

  console.log(data);
  return (
    <div
      css={css`
        ${flex({ direction: "column" })}
        margin-left: 27px;
      `}
    >
      {recentItems.map(item => (
        <div key={item}>
          <Timeline />
          {item}
        </div>
      ))}
    </div>
  );
};

export default History;
