import { ThemeProvider } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OverlayProvider } from "@toss/use-overlay";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import AppLayout from "~/layouts/AppLayout";
import { emotionTheme, GlobalCSS } from "~/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
});

function MyApp({
  Component,
  pageProps
}: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <ChakraProvider>
            <ThemeProvider theme={emotionTheme}>
              <GlobalCSS />
              <OverlayProvider>
                <AppLayout>
                  <Component {...pageProps} />
                </AppLayout>
              </OverlayProvider>
            </ThemeProvider>
          </ChakraProvider>
        </RecoilRoot>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
