import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from "next/document";
import Script from "next/script";
import { ReactElement } from "react";
import { env } from "~/constants";

type DocumentPropTypes = {
  // using `interface` is also ok
  styleTags: ReactElement;
  pathname: string;
};

export default class MyDocument extends Document<DocumentPropTypes> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

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
          <Script
            defer
            type="text/javascript"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`}
          />
          <Script
            defer
            src="https://developers.kakao.com/sdk/js/kakao.min.js"
          />
          <Script strategy="afterInteractive">{`console.log("%c" + "toppings",
        "color: #06A66C; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");`}</Script>
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
