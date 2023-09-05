// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import { Video, CloudinaryContext } from "cloudinary-react";

import Review from "../components/Review";

import AboutVideoPlayer from "../components/AboutVideoPlayer";





const Contact = () => {


  return (
    <>


      <Head>
        <title>TALKIN.AI Contact Us</title>
        
        <meta name="description" content="Talking Avatar  videos with AI, Text to Video " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>

      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
    <main>

    <div className="p-10 mx-auto max-w-4xl">

<div className="relative pt-20 ml-auto">
      <div className="lg:w-2/3 text-center mx-auto">
          <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Contact Us</h1>
          <p className="mt-8 text-xl text-gray-700 dark:text-gray-300">Please be as specific as possible </p>
         
          
      </div>
 

  </div>
   <AboutVideoPlayer />
  <Review />
  </div>
 

  </main> 
    </>

  )

};




export default Contact;



