import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { createContext, useEffect, useMemo } from "react";
import GA from "react-ga4";
import { env } from "~/constants";

interface ContextProps {
  sendPageview: (pathname: string) => void;
}
const Context = createContext<ContextProps>({} as ContextProps);

interface Props {
  children: ReactNode;
}

const sendPageview = (pathname: string) => {
  GA.send({ hitType: "pageview", page: pathname });
};

const AnalyticsProvider = ({ children }: Props) => {
  const router = useRouter();

  useEffect(
    () => GA.initialize([{ trackingId: env.GOOGLE_ANALYTICS_TRACKING_ID }]),
    []
  );

  useEffect(() => {
    sendPageview(router.pathname);
  }, [router.pathname]);

  const providerValue = useMemo(() => ({ sendPageview }), []);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default AnalyticsProvider;
