// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Container from '../components/Container';




//import { useUser } from "@clerk/nextjs";

import { Gate, useSubscription } from "use-stripe-subscription";

import NewUserTrial from "../components/NewUserTrial";



export default function PricingPage() {
  // display plans
  
  //const { isLoaded, isSignedIn, user } = useUser();

  const {
    isLoaded,
    products,
    redirectToCheckout,
  } = useSubscription();

  
  console.log(products);
  
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
        <title>AIVIDOO Pricing</title>
        <meta name="description" content="Talkin AI Pricing" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>
     
      <main>
      <div className="p-5 mx-auto max-w-4xl">
      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
       
       
    <div className="relative pt-20 ml-auto">
            <div className="lg:w-3/4 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Pricing.</h1>
                <p className="mt-8 text-xl text-gray-700 dark:text-gray-300">Choose Your Plan </p>
               
                
            </div>
       

        </div>

        <Container>
          <div className="flex w-full items-center justify-center">
            
  
          {products.toReversed().map(({ product, prices }) => (
            
        <div key={product.id} className="flex-1 text-xl mt-14 rounded-xl border border-[#cd4a1d]/25 bg-[#30373d] p-10 w-full">
          <h4 className="text-[#cd4a1d]">{product.name}</h4>
            {prices.map((price) => (
              <div key={price.id}>
              <p className="flex-1 p-8 flex flex-col items-center">
              <h5 className=" text-2xl py-2 font-medium text-center ">${price.unit_amount/100} </h5>
              <h5 className=" text-1xl font-medium text-center">Monthly</h5>
              
        
              </p>
              <button
              className="my-5 w-full text-black p-5 max-sm:p-2 rounded-3xl bg-[#cd4a1d] text-xl max-sm:text-lg hover:bg-[#fdf2bb] transition-all"
             onClick={() => redirectToCheckout({ price: price.id, successUrl: `http://localhost:3000/payment/success`, cancelUrl: `http://localhost:3000/payment/cancelled`})}
           >
             Start Plan
           </button>
           </div>
            ))}
                           
        </div>
      ))}
          </div>
          </Container>
        <Container>
          <div className="flex w-full items-center justify-center">

            <div

              className="flex-1 text-xl mt-14 rounded-xl border border-[#cd4a1d]/25 bg-[#30373d] p-10 w-full"
            >
              <h4 className="text-[#cd4a1d]">
                Feature List
              </h4>
              <p className="flex-1 p-8 flex flex-col items-left">
                <span className="font-bold text-center  text-1xl">
                  30 generations /month

                </span>

                <span className="text-center text-sm">
                  High priority
                  
                 

                </span>
                <span className="text-center text-sm">
                No watermark

                </span>
                
              </p>

            </div>
            <div

              className="flex-1 text-xl mt-14 rounded-xl border border-[#cd4a1d]/25 bg-[#30373d] p-10 w-full"
            >
              <h2 className="text-[#cd4a1d]">
                Feature List
              </h2>
              
              
              
              <p className="flex-1 p-8 flex flex-col items-center">
                <span className="font-bold text-center  text-1xl">
                  120 generations /month

                </span>
                <span className="text-center text-sm">
                High Priority 
                  
                  

                </span>
                <span className="text-center text-sm">
                No watermark

                </span>
                

              </p>
            </div>
            <div

              className="flex-1 text-xl mt-14 rounded-xl border border-[#cd4a1d]/25 bg-[#30373d] p-10 w-full"
            >
              <h2 className="text-[#cd4a1d]">
                Feature List
              </h2>
              <p className="flex-1 p-8 flex flex-col items-center">
                <span className="font-bold text-center  text-1xl">
                  300 generations /month

                </span>
                
                <span className="text-center text-sm">
                High priority
                  
                 

                </span>
                <span className="text-center text-sm">
                No watermark

                </span>
               
              </p>
            </div>

          </div>
        </Container>



        </div>
         
        
         
         
         <NewUserTrial />


        

      </main>

    </>

  )

};


