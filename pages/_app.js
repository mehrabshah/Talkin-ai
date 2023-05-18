import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AppContext from '../utils/AppContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [profilePicture, setProfilePicture] = useState('');


  return (
    <SessionProvider session={session}>
      <AppContext.Provider value={{
        profilePicture, setProfilePicture,
      }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
