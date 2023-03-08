import { useNavigationSetter, type useNavigationValue } from "@atoms/index";
import { useEffect } from "react";

export const useSetNavigation = (
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
