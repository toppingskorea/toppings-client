import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "styles/Global.styles";
import * as Sentry from "@sentry/nextjs";

import { RecoilRoot } from "recoil";

import AppLayout from "~/layouts/AppLayout";
import "../styles/font-face.css";
import { useSentry } from "~/hooks";
import { env } from "~/constants";

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
          <GlobalStyle />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </RecoilRoot>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
