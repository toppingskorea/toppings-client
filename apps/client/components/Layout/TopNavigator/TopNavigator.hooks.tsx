import { useNavigationValue } from "@atoms/navigation";
import { useOverlay } from "@toss/use-overlay";
import { AlertModal } from "~/components/Common";
import { useInternalRouter } from "~/hooks";

export const useClickBackButton = () => {
  const { back, push } = useInternalRouter();
  const state = useNavigationValue();
  const overlay = useOverlay();

  const onClickBackButton = () => {
    if (state.top?.backButtonCaution) {
      overlay.open(({ exit }) => (
        <AlertModal exitFn={exit} rightClick={{ fn: back, text: "sure" }} />
      ));

      return;
    }

    if (state.top?.backDirectlyURL) {
      push(state.top.backDirectlyURL);
      return;
    }

    back();
  };

  return {
    onClickBackButton
  };
};
