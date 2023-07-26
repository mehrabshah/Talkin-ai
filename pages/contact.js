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

      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
      <main className="p-10 mx-auto max-w-4xl">

      <div className="relative pt-20 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Contact Us</h1>
                <p className="mt-8 text-gray-700 dark:text-gray-300">Please be as specific as possible </p>
               
                
            </div>
       

        </div>
        
      



<div className="state-card grid grid-cols-1 gap-4 py-2 place-items-center md:py-2 md:grid-cols-2">
  <div>
    <h2 className="text-center px-4 py-4 text-xl text-white font-semibold md:text-left md:text-xl md:px-4 py-4">
      Contact us via Chat or the contact form below.
      
      More New Products Coming! Leave us  a request for new products and services!
      
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
            autoPlay
            loop
            disablePictureInPicture
          />
        </div>
      </CloudinaryContext>
    </div>
  </div>
</div>

<div className="profilenav">
              <h1 className="my-5">Contact Form</h1>
            </div>
<Review />
</main>
    </>

  )

};




export default Contact;



