import "../css/index.css";
import Head from "next/head";
import Layout from "../components/layout";
import "../fontAwesome.ts";
import { AppProps } from "next/dist/shared/lib/router/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
