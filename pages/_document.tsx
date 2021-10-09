import { DocumentContext } from "next/document";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="Hupro" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Hupro" />
          <meta name="description" content="App Hupro Humane Propiedades" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          {/* <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          /> */}

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon.ico"
          />
          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          /> */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://hupro.vercel.app" />
          <meta name="twitter:title" content="Hupro" />
          <meta
            name="twitter:description"
            content="App Hupro Humane Propiedades"
          />
          <meta
            name="twitter:image"
            content="https://hupro.vercel.app/icons/HUPRO LOGO.png"
          />
          {/* <meta name="twitter:creator" content="@DavidWShadow" /> */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Hupro" />
          <meta
            property="og:description"
            content="App Hupro Humane Propiedades"
          />
          <meta
            property="og:site_name"
            content="App Hupro Humane Propiedades"
          />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta
            property="og:image"
            content="https://hupro.vercel.app/icons/HUPRO LOGO.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
