import '../styles/globals.css';

import { useEffect, useState } from 'react';

import { SubscriptionProvider } from "use-stripe-subscription";
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
    <SubscriptionProvider
      stripePublishableKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
    >
    <ClerkProvider appearance={{
      baseTheme: dark
    }} {...pageProps}>
      <Layout>
      <CrispWithNoSSR />
          <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
    </SubscriptionProvider>
  );
};

export default MyApp;

