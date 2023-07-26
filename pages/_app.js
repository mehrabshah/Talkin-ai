import '../styles/globals.css';

import { useEffect, useState } from 'react';


import { dark } from '@clerk/themes';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Script from "next/script";
import Layout from "/components/Layout";
import dynamic from 'next/dynamic'

const CrispWithNoSSR = dynamic(
  () => import('../components/crisp'),
  { ssr: false }
)

const MyApp = ({ Component, pageProps }) => {

  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }} {...pageProps}>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
      <Layout>
      <CrispWithNoSSR />
          <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default MyApp;

