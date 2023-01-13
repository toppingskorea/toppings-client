import type { ComponentProps } from "react";
import { Suspense } from "react";
import { useMounted } from "~/hooks";

// SSR에서 Suspense를 사용할 수 있도록 Client인 상황을 가정합니다.
const SSRSafeSuspense = (props: ComponentProps<typeof Suspense>) => {
  const isMounted = useMounted();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isMounted ? <Suspense {...props} /> : <>{props.fallback}</>;
};

export default SSRSafeSuspense;
