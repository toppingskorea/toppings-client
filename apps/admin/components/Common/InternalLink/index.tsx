import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * # InternalLink
 * 
 * 내부 링크를 type safe하게 사용할 수 있는 컴포넌트입니다.
 * 
 * @param {InternalLinkProps} {@link InternalLinkProps}
 * 
 * @example ```tsx
    <InternalLink href="/">
      go home
    </InternalLink>

    <InternalLink href="/home" passhref>
      <span>
        test
      </span>
    </InternalLink>
 * ```
 */

interface Props extends Omit<ComponentProps<typeof Link>, "href"> {
  href: Route.Path;
}
const InternalLink = (props: Props) => {
  return <Link {...props}>{props.children}</Link>;
};

export default InternalLink;
