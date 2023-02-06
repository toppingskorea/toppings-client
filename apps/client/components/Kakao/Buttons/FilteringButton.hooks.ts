import { useInternalRouter } from "~/hooks";
import { isLoggedIn } from "~/utils";

// eslint-disable-next-line import/prefer-default-export
export const useClickFilteringButton = () => {
  const { push } = useInternalRouter();

  const onClickButtonHandler = () => {
    if (isLoggedIn()) push("/recent");
    else push("/recent/filter/restaurant");
  };

  return {
    onClickFilteringButtonHandler: onClickButtonHandler
  };
};
