import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Poster Asia</title>
        <meta
          name="description"
          content="A lightweight social media app, welcome!"
          key="desc"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
