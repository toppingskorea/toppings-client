import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import type { ReactElement } from "react";
import { env } from "~/constants";

type DocumentPropTypes = {
  // using `interface` is also ok
  styleTags: ReactElement;
  pathname: string;
};

export default class MyDocument extends Document<DocumentPropTypes> {
  render() {
    return (
      <Html lang="ko">
        <Head>
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
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.KAKAO_JAVASCRIPT_KEY}&libraries=services`}
          />

          {/* favicon start */}

          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          {/* favicon end */}

          <Script strategy="afterInteractive">{`console.log("%c" + "       _       _                       __  __       _          _______                _                 _ \\n      | |     (_)                     |  \\\\/  |     | |        |__   __|              (_)               | |\\n      | | ___  _ _ __    _   _ ___    | \\\\  / | __ _| | _____     | | ___  _ __  _ __  _ _ __   __ _ ___| |\\n  _   | |/ _ \\\\| | '_ \\\\  | | | / __|   | |\\\\/| |/ _\` | |/ / _ \\\\    | |/ _ \\\\| '_ \\\\| '_ \\\\| | '_ \\\\ / _\` / __| |\\n | |__| | (_) | | | | | | |_| \\\\__ \\\\_  | |  | | (_| |   <  __/    | | (_) | |_) | |_) | | | | | (_| \\\\__ \\\\_|\\n  \\\\____/ \\\\___/|_|_| |_|  \\\\__,_|___(_) |_|  |_|\\\\__,_|_|\\\\_\\\\___|    |_|\\\\___/| .__/| .__/|_|_| |_|\\\\__, |___(_)\\n                                                                         | |   | |             __/ |      \\n                                                                         |_|   |_|            |___/       ",
        "color: #FF7D1F; font-size: 7px;");`}</Script>
        </Head>
        <body>
          <div id="modal-root" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
