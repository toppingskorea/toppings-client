import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  type DehydratedState
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalStyle from "styles/Global.styles";
import { RecoilRoot } from "recoil";

import AppLayout from "~/layouts/AppLayout";
import "../styles/font-face.css";

const queryClient = new QueryClient();

function MyApp({
  Component,
  pageProps
}: AppProps<{ dehydratedState: DehydratedState }>) {
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
