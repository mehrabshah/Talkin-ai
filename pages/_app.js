import '../styles/globals.css';

import { SubscriptionProvider } from "use-stripe-subscription";
import { dark } from '@clerk/themes';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Layout from "/components/Layout";
import dynamic from 'next/dynamic'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
      baseTheme: dark,
      layout: {
        helpPageUrl: "https://talkin-ai.com/contact",
        
        privacyPageUrl: "https://talkin-ai.com/privacy-policy",
        
        termsPageUrl: "https://talkin-ai.com/terms",
          }
    }} >
      <Layout>
      
      <CrispWithNoSSR />
          <Component {...pageProps} />
          <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"/>
      </Layout>
    </ClerkProvider>
    </SubscriptionProvider>
  );
};

export default MyApp;

