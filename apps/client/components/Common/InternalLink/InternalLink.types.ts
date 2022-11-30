import type Link from "next/link";
import type { ComponentProps } from "react";

interface InternalLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: Route.Path;
}

export default InternalLinkProps;
