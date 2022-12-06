import { css, useTheme } from "@emotion/react";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RoundedTag, SearchInput } from "~/components/Common";
import { useInput, useSetNavigation } from "~/hooks";
import { useUploadRecentHistory } from "~/mutations/recent";
import useFetchRestaurantNameByFiltering from "~/mutations/recent/useFetchRestaurantNameByFiltering";
import tags from "./recent.constants";

const RecentPage = () => {
  const theme = useTheme();
  const { push, pathname } = useRouter();
  // 클릭한 카드의 값들이 들어가게(content, restaurantId)
  const { mutate: recentHistoryMutate } = useUploadRecentHistory();
  const { mutate } = useFetchRestaurantNameByFiltering({
    onSuccess: data => {
      console.log(data);
    }
  });

  useSetNavigation({
    top: {
      marginBottom: 85
    }
  });

  const { props: keyword, setValue } = useInput({});

  // TODO: 찬혁이 답장 오면 카드 만들지 정하기
  return (
    <SafeArea>
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
          onSubmit={() => {
            mutate(keyword.value);
          }}
          placeholder="enter the restaurant name"
          setValue={setValue}
          {...keyword}
        />
      </div>
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
          {tags.map(({ ID, NAME }) => (
            <RoundedTag
              key={ID}
              padding={{
                x: 16,
                y: 7
              }}
              _fontSize={17}
              defaultProps={{
                bgcolor: pathname.includes(ID)
                  ? theme.colors.primary
                  : theme.colors.white,
                bordercolor: theme.colors.secondary.D9
              }}
              onClick={() => push(`/recent/${ID}`)}
            >
              {NAME}
            </RoundedTag>
          ))}
        </ul>
      </div>
    </SafeArea>
  );
};

export default RecentPage;
