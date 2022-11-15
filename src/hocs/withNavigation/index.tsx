import type { NextPage } from "next";
import { useEffect } from "react";
import type { useNavigationValue } from "~/recoil/atoms";
import { useNavigationSetter } from "~/recoil/atoms";

const withNavigation =
  <P extends object>(
    options: ReturnType<typeof useNavigationValue>,
    Page: NextPage<P>
  ): NextPage<P> =>
  props => {
    const set = useNavigationSetter();
    useEffect(() => {
      set(options);
    }, [set]);
    return <Page {...props} />;
  };

export default withNavigation;
