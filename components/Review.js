// pages/pricing.js

import React from 'react';

//import { useSession, signOut } from 'next-auth/react';
//import Head from 'next/head';
import { useState } from 'react';


export default function Review() {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [productName, setProductName] = useState();
  const [planName, setPlanName] = useState();
  const [productMessage, setProductMessage] = useState();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  //const session = useSession();

  //const { status, data } = session;

  
  const submitProduct = (event) => {

    event.preventDefault();
    fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        userEmail,
        productName,
        planName,
        productMessage,
      })
    }).then(() => {
      setIsError(false);
      setMessage("Your messsage has been submitted!");
    }).catch((error) => {
      setIsError(true);
      setMessage("Something is wrong!");
      //console.log(error)
    });
    event.target.reset();
  }


  return (


    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={(event) => submitProduct(event)}>
        <div className="review-card shadow sm:rounded-md sm:overflow-hidden">

        <div className="flex flex-col">
              <label className="sr-only" htmlFor="userName">
                Name (Required)
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="userName"
                placeholder="Your Name"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="sr-only" htmlFor="userEmail">
                Email (Required)
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="userEmail"
                placeholder="Your Email"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>  
       
         
          <div className="flex flex-col">
            <label className="text-white" htmlFor="productName">
              Product Name
            </label>

            <select
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              name="productName"
              id="productName"
            >
              <option value="">Select Product</option>
              <option value="TalkingAvatar">Talking Avatar</option>
              <option value="Text2Tube">Text2Tube</option>
              <option value="Tube2Tube">Tube2Tube</option>
              <option value="RequestNewProduct">Request New Product</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div className="flex flex-col">
            <label className="text-white" htmlFor="planName">
              Plan Name
            </label>

            <select
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              name="planName"
              id="planName"
            >
              <option value="">Select Plan</option>
              <option value="Lite Plan">Lite Plan</option>
              <option value="Pro Plan">Pro Plan</option>
              <option value="Advanced Plan">Advanced Plan</option>
            </select>
          </div>


          <div>
            <label htmlFor="productMessage" className="text-white">
              Your Message
            </label>
            <div className="text-black mt-1">
              <textarea
                id="productMessage"
                name="productMessage"
                rows={16}
                value={productMessage}
                onChange={(e) => setProductMessage(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

          </div>

          <div>
            <button
              type="submit"


              className={`hero-button w-full text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || userEmail === ""
                  ? "cursor-not-allowed opacity-50"
                  : ""
                }`}

              disabled={isGenerating || userEmail === ""}
            >
              {isGenerating ? "Generating..." : "Submit Your Message"}

            </button>

          </div>
        </div>
      </form>
      <p className="header1 py-3">{message}</p>
     

     

    </div>

  )
}
















