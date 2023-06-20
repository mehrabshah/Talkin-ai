// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Container from '../components/Container';

import prisma from '../lib/prisma';

import { useState } from "react";

import { useSession, signOut } from 'next-auth/react';


import { processSubscription } from 'utils/payment';

import { processPayment } from 'utils/payment';

import initStripe from "stripe";

const PricingPage = ({ plans, trial }) => {
  // display plans
  const session = useSession();


  const { status, data } = session;

  const [priceId, setPriceId] = useState();
  return (
    <>
      <Head>
        <title>talking avarter creations</title>
        <meta name="description" content="Talkin AI Pricing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

        <div className="topnav">
          <div>
            <h1 className="header1 text-2xl md:text-2xl font-bold">Pricing</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-2">

          <p className="mt-3 text-1xl text-white">
            Choose Your Plan
          </p>


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
            {data?.user?.hadTrial ? null : (<div

              className="h-80 w-80 mx-2 bg-white text-black-700 flex flex-col"
            >
              <h2 className="text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">
                Feature List
              </h2>
              <p className="flex-1 p-8 flex flex-col items-center">
                <span className="text-gray-600  font-bold text-center  text-1xl">
                  3 mins/ 3 days

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
            </div>)}

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

  const trial = await prisma.product.findUnique({
    where: {
      name: 'New User Trial',
    },
  });

  return {
    props: {
      plans, trial
    },
  };
};

export default PricingPage;



