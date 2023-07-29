// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Container from '../components/Container';

//import { useUser } from "@clerk/nextjs";

import { Gate, useSubscription } from "use-stripe-subscription";



export default function PricingPage() {
  // display plans
  
  //const { isLoaded, isSignedIn, user } = useUser();

  const {
    isLoaded,
    products,
    subscription,
    redirectToCheckout,
    redirectToCustomerPortal,
  } = useSubscription();

  if (!isLoaded) {
    return null;
  }

  const alertResponse = async (path) => {
    const res = await fetch(path);
    const body = await res.text();
    alert(`Path requested: ${path}\nResponse: ${body}`);
  };



  return (
    <>
      <Head>
        <title>TALKIN AI Pricing</title>
        <meta name="description" content="Talkin AI Pricing" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>
     

      <main className="p-5 mx-auto max-w-4xl">
      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
       
       
    <div className="relative pt-20 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Pricing.</h1>
                <p className="mt-8 text-2xl text-gray-700 dark:text-gray-300">Choose Your Plan </p>
               
                
            </div>
       

        </div>

        <Container>
          <div className="flex w-full items-center justify-center">
            
           
          {products.map(({ product, prices }) => (
        <div key={product.id} className="h-80 w-80 mx-2 bg-white text-black-700 flex flex-col">
          <h4 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{product.name}</h4>
          
            {prices.map((price) => (
              <p key={price.id} className="flex-1 p-8 flex flex-col items-center">
              <h5 className="text-gray-600 text-2xl py-2 font-medium text-center ">${price.unit_amount/100} </h5>
              <h5 className="text-gray-600 text-1xl font-medium text-center">Monthly</h5>
              <h5 className="text-black text-1xl py-5 font-medium text-center border-b border-gray-300">3-Day Free Trial</h5>
              
              <button
                 className="hero-button  px-10 py-4  flex flex-col text-white text-center"
                onClick={() => redirectToCheckout({ price: price.id, successUrl: `http://localhost:3000/payment/success`, cancelUrl: `http://localhost:3000/payment/cancelled`})}
              >
                Start Trial 
              </button>
            
              </p>
            ))}
      
         
        </div>
      ))}
          </div>
        </Container>

        <Container>
          <div className="flex w-full items-center justify-center">

            <div

              className="h-80 w-80 mx-2 bg-white text-black-700 flex flex-col"
            >
              <h2 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">
                Feature List
              </h2>
              <p className="flex-1 p-8 flex flex-col items-left">
                <span className="text-gray-600 font-bold text-center  text-1xl">
                  5 mins /month

                </span>

                <span className="text-gray-600 text-center text-sm">
                  Use your own images

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Ask ChatGPT to create scripts

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Voice cloning

                </span>
              </p>

            </div>
            <div

              className="h-80 w-80 mx-2 bg-white text-black-700 flex flex-col"
            >
              <h2 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">
                Feature List
              </h2>
              <p className="flex-1 p-8 flex flex-col items-center">
                <span className="text-gray-600 font-bold text-center  text-1xl">
                  15 mins /month

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Use your own images

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Ask ChatGPT to create scripts

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Voice cloning

                </span>

              </p>
            </div>
            <div

              className="h-80 w-80 mx-2 bg-white text-black-700 flex flex-col"
            >
              <h2 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">
                Feature List
              </h2>
              <p className="flex-1 p-8 flex flex-col items-center">
                <span className="text-gray-600 font-bold text-center  text-1xl">
                  45 mins /month

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Use your own images

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Ask ChatGPT to create scripts

                </span>
                <span className="text-gray-600 text-center text-sm">
                  Voice cloning

                </span>

              </p>
            </div>

          </div>
        </Container>
      </main>

    </>

  )

};








