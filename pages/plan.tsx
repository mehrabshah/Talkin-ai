// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import Image from "next/image";

import Container from '../components/Container';

//import { useUser } from "@clerk/nextjs";

import { Gate, useSubscription } from "use-stripe-subscription";


import NewUserTrial from "../components/NewUserTrial";



import { motion } from "framer-motion";





export default function PlanPage() {
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

  


  return (
    <>
      <Head>
        <title>TALKIN AI PLAN</title>
        <meta name="description" content="Talkin AI Plan" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>
     
      <main>
      <div className="p-5 mx-auto min-h-screen select-none overflow-hidden">
     
       
       
    <motion.img
          
          alt="Transition Image"
          transition={{
            opacity: 0,
            layout: { duration: 0.6 },
          }}
          className=" absolute left-0  top-15  z-0   h-full w-full object-cover brightness-50"
          src="robo_1.jpeg"
        />
    
    
    <div className="relative pt-20 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Your Plan.</h1>
                <p className="mt-8 text-2xl text-gray-700 dark:text-gray-300">Manage Your Plan </p>
               
                
            </div>
       

        </div>

       

        <Container>
          <div className="z-10 flex w-full items-center justify-center">
            
           
          {products.map(({ product, prices }) => (
        <Gate product={product}>
        <div key={product.id} className="z-10 h-100 w-80 mx-2 bg-white text-black-700 flex flex-col">
          <h4 className="z-10 text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300">{product.name}</h4>
          
            
          
            <button  className="hero-button  z-10 px-10 py-4  flex flex-col text-white text-center " onClick={() => redirectToCustomerPortal({ returnUrl: `https://talkin-ai.com/plan`})}>
              Change plan
            </button>
         
         
        </div>
        </Gate>
      ))}
          </div>
        </Container>
     


     

      <div className="py-20  z-10 flex  flex-wrap justify-center gap-8 lg:gap-42.5">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 20, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="font-bold z-10 text-white dark:text-white text-3xl xl:text-sectiontitle3 mb-2.5">
                500K
              </h3>
              <p className="text-lg z-10 lg:text-para2">World Wide Users</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 20, delay: 0.7 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="font-bold z-10 text-white dark:text-white text-3xl xl:text-sectiontitle3 mb-2.5">
                1M+
              </h3>
              <p className="text-lg z-10 lg:text-para2">Creations</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 20, delay: 0.8 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="z-10 font-bold text-white dark:text-white text-3xl xl:text-sectiontitle3 mb-2.5">
                21
              </h3>
              <p className="z-10 text-lg lg:text-para2">Winning Awards</p>
            </motion.div>
          </div>
     
       
      
        {subscription? null :  (
              <NewUserTrial />     
            ) 
          }
      
      </div>
      
      </main>

    </>

  )

};








