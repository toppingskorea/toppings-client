import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "@toss/use-overlay";
import * as nextImage from "next/image";
import React from "react";
import { RecoilRoot } from "recoil";
import { emotionTheme, GlobalCSS } from "~/styles";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: props => <img {...props} />
});

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
});

const withApp = Story => {
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
      />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ThemeProvider theme={emotionTheme}>
            <GlobalCSS />
            <OverlayProvider>
              <Story />
            </OverlayProvider>
          </ThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
};

export const decorators = [withApp];
