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
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
