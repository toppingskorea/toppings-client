import { useRouter } from "next/router";

export default function useInternalRouter() {
  const router = useRouter();

  return {
    ...router,
    push(
      path: Route.Path,
      as?: Parameters<typeof router.push>[1],
      options?: Parameters<typeof router.push>[2]
    ) {
      return router.push(path, as, options);
    },
    replace(
      url: Route.Path,
      as?: Parameters<typeof router.replace>[1],
      options?: Parameters<typeof router.replace>[2]
    ) {
      return router.replace(url, as, options);
    },
    asPath: router.asPath as Route.Path
  };
}
