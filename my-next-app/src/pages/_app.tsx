import "../styles/globals.css"; // 전역 스타일
import React from "react";
import { ThemeButton } from "../components/ThemeButton";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ThemeButton />
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
