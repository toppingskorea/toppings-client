import { css, useTheme } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, gutter, position, size, touchable } from "@toss/emotion-utils";
import { memo } from "react";
import { useDeleteRecentAllHistory } from "~/mutations/recent";
import Keys from "~/queries/recent/keys";
import { Text } from "../../Typo";

interface Props {
  exit: VoidFunction;
}

const RemoveAlertModal = ({ exit }: Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useDeleteRecentAllHistory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: Keys.recent()
      });
    }
  });

  return (
    <Flex.Center
      direction="column"
      css={css`
        ${position("fixed", { top: 0, right: 0, bottom: 0, left: 0 })}
        ${size.full}
        ${gutter({ direction: "vertical", space: 30 })}
        background-color: ${theme.colors.black};
        opacity: 0.3;
      `}
    >
      <Flex.Center
        css={css`
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: ${theme.colors.secondary.E2};
          opacity: 0.9;
        `}
      >
        <Text _fontSize={32} _color={theme.colors.primary}>
          !
        </Text>
      </Flex.Center>
      <Text
        _fontSize={23}
        weight={theme.weighs.heavy}
        _color={theme.colors.white}
      >
        Are you sure?
      </Text>

      <Flex.Center
        css={css`
          ${gutter("horizontal", 122)}
        `}
      >
        <Text
          _fontSize={18}
          weight={theme.weighs.bold}
          _color={theme.colors.primary}
          css={css`
            ${touchable}
          `}
          onClick={exit}
        >
          cancle
        </Text>
        <Text
          _fontSize={18}
          weight={theme.weighs.bold}
          _color={theme.colors.primary}
          css={css`
            ${touchable}
          `}
          onClick={() => {
            deleteMutate();
            exit();
          }}
        >
          delete
        </Text>
      </Flex.Center>
    </Flex.Center>
  );
};

export default memo(RemoveAlertModal);
