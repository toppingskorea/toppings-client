import { css, useTheme } from "@emotion/react";
import { margin, padding } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { useFetchReview } from "~/server/review";

const DescriptionBox = () => {
  const { weighs, colors } = useTheme();
  const { query } = useRouter();
  const { data: reviewDetail } = useFetchReview(Number(query.id));

  return (
    <article
      css={css`
        ${margin({ x: 5 })}
        ${padding({ x: 12, y: 17 })}
        background-color: ${colors.secondary.F5};
        border-radius: 20px;
      `}
    >
      <p
        css={css`
          font-size: 11px;
          line-height: 13px;
          color: ${colors.secondary[34]};
        `}
      >
        {reviewDetail?.description}
      </p>
    </article>
  );
};

export default DescriptionBox;
