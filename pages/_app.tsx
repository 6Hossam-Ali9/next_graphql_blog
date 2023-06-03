import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import React, { useState, useEffect } from "react";
import { Layout } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
