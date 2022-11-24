import { useEffect } from "react";
import type { useNavigationValue } from "~/recoil/atoms";
import { useNavigationSetter } from "~/recoil/atoms";

const useSetNavigation = (
  props: ReturnType<typeof useNavigationValue> = {
    top: undefined,
    bottom: false
  }
) => {
  const setter = useNavigationSetter();

  useEffect(() => {
    setter(props);
  }, [props, setter]);
};

export default useSetNavigation;
