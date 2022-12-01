import { css, useTheme } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { padding, position, SafeArea, width100 } from "@toss/emotion-utils";
import { useRouter } from "next/router";
import { RoundedTag, SearchInput } from "~/components/Common";
import { SelectEatingHabit } from "~/components/Section";
import { useInput, useSetNavigation } from "~/hooks";
import {
  useDeleteRecentAllHistory,
  useUploadRecentHistory
} from "~/mutations/recent";
import Keys from "~/queries/recent/keys";
import { useRegisterState } from "~/recoil/atoms";
import tags from "./recent.constants";

const RecentPage = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [register, setRegister] = useRegisterState();
  const { mutate } = useUploadRecentHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });
  const { mutate: deleteMutate } = useDeleteRecentAllHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  useSetNavigation({
    top: {
      marginBottom: 85
    }
  });

  const { props: keyword, setValue } = useInput({});

  return (
    <SafeArea>
      <SelectEatingHabit
        onClick={(title, content) => {
          setRegister({
            ...register,
            habit: [
              {
                title,
                content
              }
            ]
          });
        }}
        habits={register.habit}
      />

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
                bgColor: theme.colors.white,
                bordercolor: theme.colors.secondary.D9
              }}
              onClick={() => push(`/recent/${ID}`)}
            >
              {NAME}
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
          onSubmit={() => console.log("sad")}
          placeholder="enter nationality name"
          setValue={setValue}
          {...keyword}
        />
      </div>
    </SafeArea>
  );
};

export default RecentPage;
