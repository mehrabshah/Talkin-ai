// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Container from '../components/Container';

import { useUser } from "@clerk/nextjs";

import { useState } from "react";

import { processSubscription } from 'utils/payment';

import initStripe from "stripe";

const PricingPage = ({ plans }) => {
  // display plans
  
  const { isLoaded, isSignedIn, user } = useUser();
  
  const [priceId, setPriceId] = useState();
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
                <p className="mt-8 text-gray-700 dark:text-gray-300">Choose Your Plan </p>
               
                
            </div>
       

        </div>

        <Container>
          <div className="flex w-full items-center justify-center">
            {plans.map((plan) => (
              <div
                key={plan.priceId}
                className="h-80 w-80 mx-2 bg-white text-black-700 flex flex-col"
              >
                <h2 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">
                  {plan.name}
                </h2>
                <p className="flex-1 p-8 flex flex-col items-center">
                  <span className="text-gray-600 text-1xl">
                    ${plan.price / 100}
                    <span className="text-black-400 text-sm uppercase">
                      {plan.currency}
                    </span>
                  </span>
                  <span className="text-xl text-gray-400 ">{plan.interval}ly</span>


                </p>


                <button
                  className="hero-button py-4 text-white text-center"
                  onClick={() => processSubscription(plan.priceId)}
                >
                  Subscribe
                </button>
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

          </div>
        </Container>
      </main>

    </>

  )

};




export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

  const { data: prices } = await stripe.prices.list({
    active: true,
    recurring: {
      'interval': `month`
    },
    type: 'recurring',
    limit: 3,
  });

  const productPromises = prices.map(async (price) => {
    const product = await stripe.products.retrieve(price.product);
    //const updatedProduct = await prisma.product.update({
    //  where: {
    //    name: product.name,
    //  },
    //  data: {
    //    priceId: price.id,
    //    price: price.unit_amount,
    //    interval: price.recurring.interval,
    //    currency: price.currency,
    //    type: 'recurring',
    //  },
    //});

    return {
      priceId: price.id,
      name: product.name,
      price: price.unit_amount,
      interval: price.recurring.interval,
      currency: price.currency,


    };
  });

  const plans = await Promise.all(productPromises);

  //const trial = await prisma.product.findUnique({
  //  where: {
  //    name: 'New User Trial',
  //  },
  //});

  return {
    props: {
      plans
    },
  };
};

export default PricingPage;



