// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Container from '../components/Container';

import PricingPlans from '../components/Pricing/PricingPlans'


//import { useUser } from "@clerk/nextjs";

// import { Gate, useSubscription } from "use-stripe-subscription";

import NewUserTrial from "../components/NewUserTrial";

const pricingData = {
  yearly: [
    {
      title: 'Free',
      price: '$0',
      description: '',
      priceId:false,
      storyBoardCount:10,
      text2Video:0,
      features: ['10 StoryBoarder/Image2Video generations']
    },
    {
      title: 'Lite',
      price: '$95.90',
      priceId: process.env.NEXT_PUBLIC_Y_LITE,
      storyBoardCount: 30,
      text2Video: 0,
      description: '$7.99/mo $95.90 billed yearly',
      features: ['30 StoryBoarder/Image2Vide generations','High priority generations']
    },
    {
      title: 'Standard',
      price: ' $287.90',
      priceId: process.env.NEXT_PUBLIC_Y_STANDARD,
      storyBoardCount: 100,
      text2Video: 10,
      description: ' $23.99/mo $287.90 billed yearly',
      features: ['100 StoryBoarder/Image2Video generations', '10 Text2Video generations', 'High priority generations']
    },
    {
      title: 'Plus',
      price: ' $575.88',
      priceId: process.env.NEXT_PUBLIC_Y_PLUS,
      storyBoardCount: 250,
      text2Video: 10,
      description: '$47.99/mo $575.88 billed yearly',
      features: ['250 StoryBoarder/Image2Video generations', '10 Text2Video generations', 'High priority generations']
    },
    {
      title: 'Pro',
      price: ' $863.9',
      priceId: process.env.NEXT_PUBLIC_Y_PRO,
      storyBoardCount: 400,
      text2Video: 20,
      description: '$71.99/mo $863.9 billed yearly',
      features: ['400 StoryBoarder/Image2Video generations', '20 Text2Video generations', 'High priority generations']
    },
    {
      title: 'Premier',
      price: ' $2879.90',
      priceId: process.env.NEXT_PUBLIC_Y_PREMIER,
      storyBoardCount: 1500,
      text2Video: 50,
      description: '$239.99/mo $2879.90 billed yearly',
      features: ['1500 StoryBoarder/Image2Video generations', '50 Text2Video generations', 'High priority generations']
    },
  ],
  monthly: [
    {
      title: 'Free',
      price: '$0',
      priceId:false,
      description: '',
      storyBoardCount: 10,
      text2Video: 0,
      features: ['10 StoryBoarder/Image2Video generations']
    },
    {
      title: 'Lite',
      price: '$9.99',
      priceId: process.env.NEXT_PUBLIC_M_LITE,
      description: 'Per month',
      storyBoardCount: 30,
      text2Video: 0,
      features: ['30 StoryBoarder/Image2Vide generations','High priority generations']
    },
    {
      title: 'Standard',
      price: '$29.99',
      priceId: process.env.NEXT_PUBLIC_M_STANDARD,
      description: 'Per month',
      storyBoardCount: 100,
      text2Video: 10,
      features: ['100 StoryBoarder/Image2Video generations', '10 Text2Video generations', 'High priority generations']
    },
    {
      title: 'Plus',
      price: ' $59.99',
      priceId: process.env.NEXT_PUBLIC_M_PLUS,
      description: 'Per month',
      storyBoardCount: 250,
      text2Video: 10,
      features: ['250 StoryBoarder/Image2Video generations', '10 Text2Video generations', 'High priority generations']
    },
    {
      title: 'Pro',
      price: ' $89.99',
      priceId: process.env.NEXT_PUBLIC_M_PRO,
      description: 'Per month',
      storyBoardCount: 400,
      text2Video: 20,
      features: ['400 StoryBoarder/Image2Video generations', '20 Text2Video generations', 'High priority generations']
    },
    {
      title: 'Premier',
      price: ' $299.99',
      priceId: process.env.NEXT_PUBLIC_M_PREMIER,
      description: 'Per month',
      storyBoardCount: 1500,
      text2Video: 50,
      features: ['1500 StoryBoarder/Image2Video generations', '50 Text2Video generations', 'High priority generations']
    },
  ]
};


export default function PricingPage() {
  // display plans
  
  //const { isLoaded, isSignedIn, user } = useUser();

  
  
  
 

  const alertResponse = async (path) => {
    const res = await fetch(path);
    const body = await res.text();
    alert(`Path requested: ${path}\nResponse: ${body}`);
  };

  const handleSubscribe=async (data) => {
    console.log(data);
  };


  return (
    <>
      <Head>
        <title>AIVIDOO Pricing</title>
        <meta name="description" content="AIVIDOO Pricing" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>
     
      <main>
      <div className="p-5 mx-auto max-w-4xl">
     
       
       
    <div className="relative pt-20 ml-auto">
    <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-20 bg-gradient-to-r from-yellow-400 to-orange-600 dark:to-indigo-600"></div>
        <div className="blur-[106px] h-30 bg-gradient-to-r from-orange-600 to-red-400 dark:from-red-700"></div>
        </div>
            <div className="lg:w-3/4 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Pricing.</h1>
                <p className="mt-8 text-xl text-[#ccc5b9] dark:text-gray-300">Choose Your Plan </p>
               
                
            </div>
       

        </div>

        <Container>
          <div className="flex-1">
              <PricingPlans handleSubscribe={handleSubscribe} pricingData={pricingData}></PricingPlans>
            
  
          {/* {products.toReversed().map(({ product, prices }) => (
            
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
      ))} */}
          </div>
          </Container>
        {/* <Container>
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
        </Container> */}



        </div>
         
        
         
         
        


        

      </main>

    </>

  )

};


