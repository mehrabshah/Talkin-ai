// pages/pricing.js

import React from 'react';

import Head from 'next/head';

import { Video, CloudinaryContext } from "cloudinary-react";

import Review from "../components/Review";



const Contact = () => {





  return (
    <>


      <Head>
        <title>TALKIN.AI Contact Us</title>
        <meta name="description" content="CONTACT TALKIN AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>

      <div class="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div class="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div class="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
      <main className="p-10 mx-auto max-w-4xl">

      <div class="relative pt-20 ml-auto">
            <div class="lg:w-2/3 text-center mx-auto">
                <h1 class="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Contact Us</h1>
                <p class="mt-8 text-gray-700 dark:text-gray-300">Please be as specific as possible </p>
               
                
            </div>
       

        </div>
        
      



<div className="state-card grid grid-cols-1 gap-4 py-2 place-items-center md:py-2 md:grid-cols-2">
  <div>
    <h2 className="text-center mx-4 my-4 text-xl text-white font-semibold md:text-left md:text-xl md:mx-2 my-4">
      More New Products Coming! Leave us a review or a request for new products and services!
      
    </h2>

  </div>

  <div>
    <div className="video-card flex justify-center items-center gap-3 m-auto mt-2 py-2 px-6">
      <CloudinaryContext cloud_name="dbospsdwo" secure>
        <div>
          <Video
            publicId="la_beach_caattj"
            width="512"
            height="512"
            controls
            autoplay
            loop
            disablePictureInPicture
          />
        </div>
      </CloudinaryContext>
    </div>
  </div>
</div>
<Review />
</main>
    </>

  )

};




export default Contact;



