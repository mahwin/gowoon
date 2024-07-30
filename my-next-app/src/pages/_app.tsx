import "../styles/globals.css"; // 전역 스타일
import React from "react";
import { ThemeButton } from "../components/ThemeButton";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bookmark</title>
        <meta name="title" content="Bookmark Application" />
        <meta name="description" content="자신만의 Bookmark 저장소 ~!" />
        <meta property="og:title" content="자신만의 Bookmark" />
        <meta property="og:description" content="안전한 Bookmark 저장소" />
      </Head>
      <Layout>
        <ThemeButton />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
