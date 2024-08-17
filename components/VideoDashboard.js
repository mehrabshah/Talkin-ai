
import React, { useState,useContext } from "react";
import { useUser } from "@clerk/nextjs";
import cn from "classnames";

import { useEffect } from 'react';
import Link from 'next/link';
import SocialLinkBar from './SocialLinkBar';
import { isAudio, validateAudioSize, } from '../utils/fileValidation';
import Disclaimer from './Disclaimer';
import Text2VideoFAQ from './Text2VideoFAQ';
import DiscordButton from './DiscordButton';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { Gate, useSubscription } from "use-stripe-subscription";
import { findCreation, checkNewUserTrial} from "../utils/functions";
import SubscriptionContext from "../context/SubscriptionContext";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {

  const [promptInput, setPromptInput] = useState("");

  const [negativePrompt, setNegativePrompt] = useState("");

  const [videoLength, setVideoLength] = useState("16");
  
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPrediction, setVideoPrediction] = useState(null);

  const [videoSrc, setVideoSrc] = useState();
  const [usage, setUsage] = useState('');
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);

  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);
  const [seed, setSeed] = useState();
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [image, setImage] = useState(null);
  const [canShowImage, setCanShowImage] = useState(false);

  //get the  3 days lag date from current date 

  
 
  // const {
  //   subscription,
  // } = useSubscription();

  const { isSignedIn, user } = useUser();


  const showLoadingState = loading || (image && !canShowImage);
  
  
  useEffect(() => {

    // fetchUserUsage();

  });

  // updated code subscription check
  const [count, setCount] = useState(0);

  const {
    subscriptionData,
    decreaseText2VideoCount
  } = useContext(SubscriptionContext);

  console.log('here is sub data', subscriptionData)

  useEffect(() => {
    setCount(subscriptionData?.metadata?.text2Video)
    // fetchUserUsage();

  }, [subscriptionData?.metadata?.text2Video]);

  

  const handleOnSubmit = async (event) => {

    event.preventDefault();

  
    //useEffect(()=>{
    //  const ele = document.querySelector('.buble');
    //if (ele) {
    //  ele.style.left = `${Number(value / 4)}px`;
   // }
  //})

    // post request to prediction api to create talking avatar
    const video_body = {
      model_name: "dreamlike-art/dreamlike-photoreal-2.0",
      prompt: promptInput,
      timestep_t0: 44,
      timestep_t1: 47,
      motion_field_strength_x: 12,
      motion_field_strength_y: 12,
      video_length: 16,
      fps: 4,
      seed: seed
    };

    const video_response = await fetch("/api/video_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        video_body),
    });

    let videoPrediction = await video_response.json();
    if (video_response.status !== 201) {
      setError(videoPrediction.detail);

      return;
    }

    setVideoPrediction(videoPrediction);
    while (
      videoPrediction.status !== "succeeded" &&
      videoPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const video_response = await fetch("/api/video_predictions/" + videoPrediction.id);
      videoPrediction = await video_response.json();
      if (video_response.status !== 200) {
        setError(videoPrediction.detail);
        setVideoPrediction(videoPrediction);
        return;
      }
      console.log({ videoPrediction });
      setVideoPrediction(videoPrediction);
    }

    if (videoPrediction.status == "succeeded") {
      setVideoPrediction(videoPrediction);
      setVideoSrc(videoPrediction.output);
      const video_url = videoPrediction.output;
      
      const updatedCount = await decreaseText2VideoCount(user?.primaryEmailAddress?.emailAddress)
      setCount(updatedCount?.metadata?.text2Video)  


      try {

        // upload to cloudinary
        const video_formData = new FormData();
        video_formData.append('file', video_url);
        video_formData.append('upload_preset', 'tube_video');

        const video_data = await fetch('https://api.cloudinary.com/v1_1/dbospsdwo/video/upload', {
          method: 'POST',
          body: video_formData
        }).then(r => r.json());

        //const cld_video_url = video_data.secure_url;
        //const cld_video_url = video_data.secure_url;
        //const cld_video_id = video_data.public_id;
        const cld_video_url = video_data.secure_url;

        //console.log({ cld_video_url });
        
        setVideoUrl(video_data.secure_url);
        //const videoDuration = Math.floor(video_data.duration * 60);
        

        const dateCreated = new Date();

          //update the database
        const req_body = {cld_video_url, dateCreated };
        await fetch('/api/add_usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req_body),
          });
        
       
        //await Router.push('/drafts');
      } catch (error) {
        console.error(error);
      }
    }
    setPromptInput("");
    setNegativePrompt("");
      
    setVideoLength("16");


  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
      
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center">
      
          <form
            className="space-y-2 w-full mb-10"
            onSubmit={(e) => handleOnSubmit(e)}
          >
          <h1>Available generation : {count || 0}</h1>
            <input
              className="shadow-sm text-gray-700 rounded-sm px-3 py-2 mb-4 sm:mb-0 sm:min-w-[600px]"
              type="text"
              placeholder="Prompt for Video"
              onChange={(e) => setPromptInput(e.target.value)}
            />
            <button
              className=" hero-button min-h-[40px] shadow-sm sm:w-[100px] py-2 inline-flex justify-center font-medium items-center px-4 text-gray-100 sm:ml-2 rounded-md"
              type="submit"
              disabled={promptInput === ""}
            >
              {showLoadingState && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {!showLoadingState ? "Generate" : ""}
            </button>
          </form>
          
          <div className="relative flex w-full items-center justify-center">
          {videoPrediction?.output && (
            <div >
              <video controls muted autoPlay
                //src={prediction.output[prediction.output.length - 1]}
                src={videoSrc}
                alt="output"
              />
            </div>
          )}
          </div>
          <p className="py-3 text-sm opacity-50 text-white">video status: {videoPrediction?.status}</p>
         </div>




      <Disclaimer />
      <DiscordButton />
      <Text2VideoFAQ />
    </div>

  );
}


