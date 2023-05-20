// pages/pricing.js

import React from 'react';

import { useSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';



export default function Review() {

  const [productName, setProductName] = useState();
  const [planName, setPlanName] = useState();
  const [productReview, setProductReview] = useState();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const session = useSession();

  const { status, data } = session;

  const submitProduct = (event) => {

    event.preventDefault();
    fetch('/api/add-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productName,
        planName,
        productReview,
      })
    }).then(() => {
      setIsError(false);
      setMessage("We have received your feedback! Thank you!");
    }).catch((error) => {
      setIsError(true);
      setMessage("Something is wrong!");
      //console.log(error)
    });
    event.target.reset();
  }


  return (


    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="app__discord-logo">
        <img src='/talkinai_contact.png' alt="app logo" />
        <div className="header1 text-1xl font-bold">Please be as specific as possible!</div>
      </div>
      <form onSubmit={(event) => submitProduct(event)}>
        <div className="review-card shadow sm:rounded-md sm:overflow-hidden">


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
              <option value="Tube2Lip">Tube2Lip</option>
              <option value="GPT2Speech">GPT2Speech</option>
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
              <option value="New User Trial">New User Trial</option>
              <option value="Lite Plan">Lite Plan</option>
              <option value="Pro Plan">Pro Plan</option>
              <option value="Advanced Plan">Advanced Plan</option>
            </select>
          </div>


          <div>
            <label htmlFor="about" className="block text-sm font-medium text-white-700">
              Review
            </label>
            <div className="text-black mt-1">
              <textarea
                id="productReview"
                name="productReview"
                rows={7}
                value={productReview}
                onChange={(e) => setProductReview(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

          </div>

          <div>
            <button
              type="submit"


              className={`hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || planName === ""
                  ? "cursor-not-allowed opacity-50"
                  : ""
                }`}

              disabled={isGenerating || planName === ""}
            >
              {isGenerating ? "Generating..." : "Submit Your Review"}

            </button>

          </div>
        </div>
      </form>
      <p className="header1 py-3">{message}</p>

    </div>

  )
}
















