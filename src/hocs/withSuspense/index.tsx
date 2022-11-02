import { Flex } from "@toss/emotion-utils";
import type { NextPage } from "next";
import type { FC, ReactNode } from "react";
import { SSRSafeSuspense } from "~/components/Common";
import { Text } from "~/constants";

type WithSuspense = <P extends object>(
  Component: FC<P>,
  Fallback?: FC<P> | ReactNode
) => NextPage<P>;

// Suspense작업을 hoc형태로 도와줍니다.
const withSuspense: WithSuspense =
  (
    Component,
    Fallback = (
      <Flex.Center>
        <Text _fontSize={24}>기본 로딩 컴포넌트</Text>
      </Flex.Center>
    )
  ) =>
  props =>
    (
      <SSRSafeSuspense
        fallback={
          typeof Fallback === "function" ? <Fallback {...props} /> : Fallback
        }
      >
        <Component {...props} />
      </SSRSafeSuspense>
    );

export default withSuspense;
