import { ThemeProvider } from "@emotion/react";
import * as Sentry from "@sentry/nextjs";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OverlayProvider } from "@toss/use-overlay";
import type { AppContext, AppProps } from "next/app";
import NextAppBase from "next/app";
import { RecoilRoot } from "recoil";
import { env } from "~/constants";
import { AnalyticsProvider, DeviceInfoProvider } from "~/contexts";
import { useSentry } from "~/hooks";
import AppLayout from "~/layouts/AppLayout";
import { emotionTheme, GlobalCSS } from "~/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  },
  logger: {
    log: message => {
      Sentry.captureMessage(message);
    },
    warn: message => {
      Sentry.captureMessage(message);
    },
    error: error => {
      Sentry.captureException(error);
    }
  }
});

interface PageProps {
  $ua: {
    userAgent?: string;
    hints?: {
      isMobile: boolean;
    };
  };
  dehydratedState: DehydratedState;
}

function MyApp({ Component, pageProps }: AppProps<PageProps>) {
  useSentry({
    dsn: env.SENTRY_DSN,
    allowUrls: [
      "https://planet.toppings.co.kr/",
      "https://dev-planet.toppings.co.kr/"
    ]
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DeviceInfoProvider
          hints={pageProps.$ua.hints}
          userAgent={pageProps.$ua.userAgent}
        >
          <RecoilRoot>
            <ThemeProvider theme={emotionTheme}>
              <GlobalCSS />
              <AnalyticsProvider>
                <OverlayProvider>
                  <AppLayout>
                    <Component {...pageProps} />
                  </AppLayout>
                </OverlayProvider>
              </AnalyticsProvider>
            </ThemeProvider>
          </RecoilRoot>
        </DeviceInfoProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextAppBase.getInitialProps(appContext);
  const headers = appContext.ctx.req?.headers;
  const prevPageProps = (appProps.pageProps as PageProps) ?? {};
  const nextPageProps = {
    ...prevPageProps,
    $ua: {
      userAgent: headers?.["user-agent"],
      hints: {
        isMobile: headers?.["sec-ch-ua-mobile"]?.includes("1")
      }
    }
  };

  return {
    ...appProps,
    pageProps: nextPageProps
  };
};

export default MyApp;
