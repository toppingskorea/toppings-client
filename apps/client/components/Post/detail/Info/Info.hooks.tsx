import { css, useTheme } from "@emotion/react";
import { Flex, size } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { OrangeStar } from "~/assets/svgs/common";
import { IconWithTextModal } from "~/components/Common";
import { useSendNotification } from "~/server/notice";
import {
  useDeleteLike,
  useDeleteScrap,
  usePostLike,
  usePostScrap
} from "~/server/restaurant";
import { clipboard, hexToRgba } from "~/utils";
import type { Props } from ".";

const useClickHandler = ({
  id,
  like,
  scrap,
  address,
  description,
  name
}: Pick<
  Props,
  "id" | "like" | "scrap" | "address" | "description" | "name"
>) => {
  const { colors } = useTheme();
  const overlay = useOverlay();

  const { mutateAsync: postScrapMutateAsync } = usePostScrap(id);
  const { mutate: deleteScrapMutate } = useDeleteScrap(id);
  const { mutateAsync: postLikeMutateAsync } = usePostLike(id);
  const { mutate: deleteLikeMutate } = useDeleteLike(id);
  const { mutate: sendNotificationMutate } = useSendNotification();

  const onClipboardClickHandler = () => {
    clipboard(address);
    overlay.open(({ exit }) => (
      <IconWithTextModal
        text="Link copied"
        exitFn={exit}
        icon={
          <Flex.Center
            css={css`
              ${size({
                width: 50,
                height: 50
              })}
              background-color: ${hexToRgba(colors.secondary.E2, 0.9)};
              border-radius: 50%;
            `}
          >
            <OrangeStar />
          </Flex.Center>
        }
      />
    ));
  };

  const onShareButtonClickHandler = () => {
    const shareData = {
      title: name,
      text: description,
      url: `https://dev.toppings.co.kr/post/${id}`
    };

    if (navigator.canShare && navigator.canShare(shareData))
      navigator.share(shareData);
  };

  const onLikeButtonClickHandler = async () => {
    if (like) deleteLikeMutate(id);
    else {
      const result = await postLikeMutateAsync(id);

      if (result.success)
        sendNotificationMutate({
          id,
          type: "Like"
        });
    }
  };

  const onScrapButtonClickHandler = async () => {
    if (scrap) deleteScrapMutate(id);
    else {
      const result = await postScrapMutateAsync(id);

      if (result.success)
        sendNotificationMutate({
          id,
          type: "Scrap"
        });
    }
  };

  return {
    onClipboardClickHandler,
    onShareButtonClickHandler,
    onLikeButtonClickHandler,
    onScrapButtonClickHandler
  };
};

export default useClickHandler;
