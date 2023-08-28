import Link from "next/link";
import Head from 'next/head';
import { useContext } from 'react';
import PrivacyPolicy from "../components/PrivacyPolicy";



export default function Home() {
  
  return (
    <>

      <Head>
        <title>TALKIN AI Privay Policy</title>
        <meta name="description" content="TALKIN AI Privacy Policy" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>


      <div className="max-w-7xl w-100 m-auto px-1">
        
      <div className="mx-auto md:text-center">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-white sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-gray-700 mx-auto mt-6 max-w-xl text-xl leading-7">
          Talkin.AI is a premier generative AI platform that prioritizes the protection of data and user experience for all of our users.
          </p>
        </div>
        
       

      </div>
      <PrivacyPolicy />

    </>

  );
}
