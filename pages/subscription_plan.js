// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Container from '../components/Container';

import { useUser } from "@clerk/nextjs";

import { Gate, useSubscription } from "use-stripe-subscription";


import { addCreation } from "../utils/functions";

export default function PricingPage() {
  // display plans
  
  const { isSignedIn, user } = useUser();

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;
    const dateCreated = new Date();
    const videoDuration = 2;
    
    try {
    
      addCreation(userId, videoDuration, dateCreated);
    
    
    } catch (error) {
      console.error(error);
    }




  }






  return (
    <>
      <Head>
        <title>TALKIN AI PLAN</title>
        <meta name="description" content="Talkin AI Plan" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>
     

      <main className="p-5 mx-auto max-w-4xl">
      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
       
       
    <div className="relative pt-20 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Your Plan.</h1>
                <p className="mt-8 text-2xl text-gray-700 dark:text-gray-300">Manage Your Plan </p>
               
                
            </div>
       

        </div>

        <Container>
          <div className="flex w-full items-center justify-center">
            
           
          
       
        <div key={subscription?.id} className="h-100 w-80 mx-2 bg-white text-black-700 flex flex-col">
          <h4 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{subscription?.id}</h4>

          <h4 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{subscription?.items.data[0].id}</h4>

          <h4 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{subscription?.items.data[0].quantity}</h4>
          
          <h4 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{subscription?.plan.id}</h4>

          <h4 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{subscription?.start_date}</h4>
          
          <button  className="hero-button  px-10 py-4  flex flex-col text-white text-center" onClick={(e) => handleOnSubmit(e)}>
              Submit Usage
            </button>

        </div>
      
    
          </div>
        </Container>

        
      </main>

    </>

  )

};








