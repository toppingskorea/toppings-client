import { useBooleanState } from "~/hooks";

const useBlurController = () => {
  const [isFocused, setTrue, setFalse] = useBooleanState();

  const controller = {
    onFocus: setTrue,
    onBlur: setFalse
  };

  return {
    isFocused,
    focusController: controller
  };
};

export default useBlurController;
