import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import type { ReactElement } from "react";

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
          <meta property="og:image" content="/link_image.png" />
          <meta property="og:title" content="toppings" />
          <meta name="description" content="The best restaurant for me" />
          <meta
            property="og:description"
            content="The best restaurant for me"
          />
          <link rel="icon" href="/favicon.ico" />

          <Script strategy="afterInteractive">{`console.log("%c" + "       _       _                       __  __       _          _______                _                 _ \\n      | |     (_)                     |  \\\\/  |     | |        |__   __|              (_)               | |\\n      | | ___  _ _ __    _   _ ___    | \\\\  / | __ _| | _____     | | ___  _ __  _ __  _ _ __   __ _ ___| |\\n  _   | |/ _ \\\\| | '_ \\\\  | | | / __|   | |\\\\/| |/ _\` | |/ / _ \\\\    | |/ _ \\\\| '_ \\\\| '_ \\\\| | '_ \\\\ / _\` / __| |\\n | |__| | (_) | | | | | | |_| \\\\__ \\\\_  | |  | | (_| |   <  __/    | | (_) | |_) | |_) | | | | | (_| \\\\__ \\\\_|\\n  \\\\____/ \\\\___/|_|_| |_|  \\\\__,_|___(_) |_|  |_|\\\\__,_|_|\\\\_\\\\___|    |_|\\\\___/| .__/| .__/|_|_| |_|\\\\__, |___(_)\\n                                                                         | |   | |             __/ |      \\n                                                                         |_|   |_|            |___/       ",
        "color: #EAB543; font-size: 7px;");`}</Script>
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
