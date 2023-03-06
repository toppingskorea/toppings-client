import { useRouter } from "next/router";
import { createContext, useEffect, useMemo } from "react";
import GA from "react-ga4";
import { env } from "~/constants";

interface ContextProps {
  sendPageView: (pathname: string) => void;
}
const Context = createContext<ContextProps>({} as ContextProps);

const sendPageView = (pathname: string) => {
  GA.send({ hitType: "pageview", page: pathname });
};

export const AnalyticsProvider = ({ children }: Util.PropsWithChild) => {
  const router = useRouter();

  useEffect(
    () => GA.initialize([{ trackingId: env.GOOGLE_ANALYTICS_TRACKING_ID }]),
    []
  );

  useEffect(() => {
    sendPageView(router.pathname);
  }, [router.pathname]);

  const providerValue = useMemo(() => ({ sendPageView }), []);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
