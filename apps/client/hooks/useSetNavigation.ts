import type { useNavigationValue } from "@atoms/index";
import { useNavigationSetter } from "@atoms/index";
import { useEffect } from "react";

const useSetNavigation = (
  props: ReturnType<typeof useNavigationValue> = {
    top: undefined,
    bottom: false
  }
) => {
  const setter = useNavigationSetter();

  useEffect(() => {
    setter(props);

    return () => {
      setter({
        top: undefined,
        bottom: false
      });
    };
  }, [props, setter]);
};

export default useSetNavigation;
