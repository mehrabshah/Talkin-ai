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

      <main className="p-10 mx-auto max-w-4xl">

        
        
      

<div className="topnav">
  <div>
    <h1 className="header1 text-2xl md:text-2xl font-bold">Contact Us</h1>
  </div>
</div>

<div className="flex flex-col items-center justify-center px-4 py-2">

  <p className="mt-3 text-1xl text-white">
    Please be as specific as possible
  </p>
</div>

<div className="state-card grid grid-cols-1 gap-4 py-2 place-items-center md:py-2 md:grid-cols-2">
  <div>
    <h2 className="text-center mx-4 my-4 text-xl text-white font-semibold md:text-left md:text-xl md:mx-2 my-4">
      More New Products Coming! Leave us a review or a request for new products and services!
      
    </h2>

  </div>

  <div>
    <div className="video-card flex justify-center items-center gap-3 m-auto mt-2 py-2 px-6">
      <CloudinaryContext cloud_name="dbospsdwo">
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



