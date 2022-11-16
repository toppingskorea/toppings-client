import Link from "next/link";
import type InternalLinkProps from "./InternalLink.types";

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
const InternalLink = (props: InternalLinkProps) => {
  return <Link {...props}>{props.children}</Link>;
};

export default InternalLink;
