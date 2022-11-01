import { ThemeProvider } from "@emotion/react";
import * as Sentry from "@sentry/nextjs";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { GlobalCSS, emotionTheme } from "~/styles";
import { env } from "~/constants";
import { useSentry } from "~/hooks";
import AppLayout from "~/layouts/AppLayout";
import "../styles/font-face.css";

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

function MyApp({
  Component,
  pageProps
}: AppProps<{ dehydratedState: DehydratedState }>) {
  useSentry({
    dsn: env.SENTRY_DSN,
    allowUrls: ["http://dev.toppings.co.kr/", "https://dev.toppings.co.kr/"]
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ThemeProvider theme={emotionTheme}>
            <GlobalCSS />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </RecoilRoot>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
