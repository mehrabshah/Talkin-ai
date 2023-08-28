
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

import { useEffect } from 'react';
import Link from 'next/link';
import SocialLinkBar from './SocialLinkBar';
import { isAudio, validateAudioSize, } from '../utils/fileValidation';
import Disclaimer from './Disclaimer';
import Text2VideoFAQ from './Text2VideoFAQ';
import DiscordButton from './DiscordButton';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { Gate, useSubscription } from "use-stripe-subscription";
import { findCreation, checkNewUserTrial, errorMessage, successMessage } from "../utils/functions";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {

  const [promptInput, setPromptInput] = useState("");

  const [negativePrompt, setNegativePrompt] = useState("");

  const [videoLength, setVideoLength] = useState(16);
  const [seed, setSeed] = useState(0);

  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPrediction, setVideoPrediction] = useState(null);

  const [videoSrc, setVideoSrc] = useState();
  const [usage, setUsage] = useState('');
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);

  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);
  

  //get the  3 days lag date from current date 

  
 
  const {
    subscription,
  } = useSubscription();

  const { isSignedIn, user } = useUser();


  const fetchUserUsage = async () => {
    
    const userId = user?.id;
    // check whether subscribed and the usage is not over plan limit
    if (subscription != null) {
      
      
      const subscriptionStart= subscription.start_date;

      const subscriptionUsage = await findCreation(userId, subscriptionStart);
      //const response = await fetch(`/api/fetch_usage?subscriptionStart=${subscription?.start_date}`);
      //const result = await response.json();
      setUsage(subscriptionUsage);
      //console.log(result.userUsage);
      
      switch (subscription.plan.id) {
        case "price_1NKLt1Dfv2951nlDZgy3rBUp":
          if (subscriptionUsage < 3 * 60 * 60) {
            setIsOverUsageLimit(false);
          }
          break;
        case "price_1NLlSvDfv2951nlD1Nz9MrRo":
          if (subscriptionUsage < 10 * 60 * 60) {
            setIsOverUsageLimit(false);
          }
          break;
        case "price_1NLlT8Dfv2951nlDtxCDnigJ":
          if (subscriptionUsage < 25 * 60 * 60) {
            setIsOverUsageLimit(false);
          }
          break;
      }
    }
    else {

      const trialUsage = await checkNewUserTrial(userId);

      if (trialUsage.length > 0) {
			  setIsOverUsageLimit(true);
        setNewUser(false); 
        //errorMessage("You have used new user trial.");
			
		  } else {
         setIsOverUsageLimit(false);
         setNewUser(true); 
			   //successMessage("Start your trial today🎉");
			   
		  }
    }

  }
  
  useEffect(() => {

    fetchUserUsage();

  });
  

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
      negative_prompt: negativePrompt,
      timestep_t0: 44,
      timestep_t1: 47,
      motion_field_strength_x: 12,
      motion_field_strength_y: 12,
      video_length: videoLength,
      fps: 4,
      seed: seed,
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
    }

    if (videoPrediction.status == "succeeded") {
      setVideoPrediction(videoPrediction);
      setVideoSrc(videoPrediction.output);
      const video_url = videoPrediction.output;

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
        
        setVideoUrl(video_data.secure_url);
        const videoDuration = Math.floor(video_data.duration * 60);
        

        const dateCreated = new Date();

          //update the database
        const req_body = {videoDuration, dateCreated };
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

  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
        {newUser? (
              
              <button
                className={`${
                  effect && "animate-wiggle"
                } hero-button text-white font-bold py-2 px-4 rounded`} onClick={() => {
                  setEffect(true);
                }}
                onAnimationEnd={() => setEffect(false)}
              >Start Your New User Trial Today</button>
    
          ) : null}




          {isOverUsageLimit? 
            (
              <Link href="/pricing">
                <button
                  className="hero-button text-white font-bold py-2 px-4 rounded"
                >Buy a Plan</button>
              </Link>
            ) :
            (null) 
          }


          <form onSubmit={(e) => handleOnSubmit(e)}>
            


            <div className="flex flex-col py-5">
              <label htmlFor="promptInput" className="text-white">
                Prompt (Required)
              </label>
              <textarea
                rows={2}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                required
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="A panda dancing on Time Square"
                type="text"
                name="promptInput"
                id="promptInput"
              />
            </div>

            <div className="flex flex-col py-5">
              <label className="text-white" htmlFor="negativePrompt">
                Negative prompt (Optional)
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="negativePrompt"
                placeholder=""
                id="negativePrompt"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-5">
              <label className="text-white" htmlFor="videoLength">
                Video Length (Seconds)
              </label>
              <input
                value={videoLength}
                onChange={(e) => setVideoLength(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="videoLength"
                id="videoLength"
                type="number"
                placeholder="Default: 16"
              />
            </div>
           
            <div className="flex flex-col py-5">
              <label className="text-white" htmlFor="seed">
                Seed
              </label>
              <input
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="seed"
                id="seed"
                type="number"
                placeholder="Default: 0"
              />
            </div>

            {isOverUsageLimit ?
              (
                <Link href="/pricing">
                  <button
                    className="hero-button text-white font-bold py-2 px-4 rounded"
                  >Buy a Plan</button>
                </Link>
              ) :
              (<button
                className={`hero-button w-full text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || promptInput === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                type="submit"
                disabled={isGenerating || promptInput === ""}
              >
                {isGenerating ? "Generating..." : "Generate Video"}
              </button>) 
            }

          </form>
          {videoPrediction?.output && (
            <div >
              <video controls muted autoPlay
                //src={prediction.output[prediction.output.length - 1]}
                src={videoSrc}
                alt="output"
              />
            </div>
          )}
          <p className="py-3 text-sm opacity-50 text-white">video status: {videoPrediction?.status}</p>
          <p className="py-3 text-sm opacity-50 text-white">video url: {videoUrl}</p>

        </div>
      </div>


      <Disclaimer />
      <DiscordButton />
      <SocialLinkBar url={videoUrl} />

      <Text2VideoFAQ />
    </div>

  );
}


