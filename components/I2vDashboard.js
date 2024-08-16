
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import cn from "classnames";

import { useEffect , useContext} from 'react';
import Link from 'next/link';
import SocialLinkBar from './SocialLinkBar';
import { isImage, validateImgSize } from '../utils/fileValidation';
import Disclaimer from './Disclaimer';
import Text2VideoFAQ from './Text2VideoFAQ';
import DiscordButton from './DiscordButton';
import { Gate, useSubscription } from "use-stripe-subscription";
import { findCreation, checkNewUserTrial} from "../utils/functions";
import { Video, CloudinaryContext } from "cloudinary-react";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SubscriptionContext from "../context/SubscriptionContext";



const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


export default function Dashboard() {

  const [promptInput, setPromptInput] = useState("");

  const [negativePrompt, setNegativePrompt] = useState("");

  const [videoLength, setVideoLength] = useState("16");
  
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPrediction, setVideoPrediction] = useState(null);

  const [videoPublicId, setVideoPublicId] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [usage, setUsage] = useState('');
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);
  const [imageError, setImageError] = useState();

  const [isGenerating, setIsGenerating] = useState(false);

  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [image, setImage] = useState(null);
  const [canShowImage, setCanShowImage] = useState(false);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [fps, setFps] = useState("");
  const [motion, setMotion] = useState("");
  const [seed, setSeed] = useState("");
  const [numInferenceSteps, setNumInferenceSteps] = useState("");

  


  //get the  3 days lag date from current date 

  
 
  

  const { isSignedIn, user } = useUser();


  const showLoadingState = loading || (image && !canShowImage);
  
  
  // updated code subscription check
  const {
    subscriptionData,
    decreaseText2VideoCount
  } = useContext(SubscriptionContext);

  console.log('here is sub data', subscriptionData)
  
  const handleImageChange = (e) => {
    setImageError('');
    const img = e.target.files[0];
    // if no image selected
    if (!img) {
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      const error = 'File type should be a jpg/jpeg image';
      toast(error, { type: 'error' });
      setImageError(error);
      return;
    }
    const isImageLarge = validateImgSize(img);
    if (isImageLarge) {
      const error = 'File must be less or equal to 1MB';
      toast(error, { type: 'error' });
      setImageError(error);
      return;
    }
    const reader = new FileReader();
    // converts to BASE 64
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setImage(img);
    });
  };


  const handleOnSubmit = async (event) => {

    event.preventDefault();

    const form = event.currentTarget;

    const image_fileInput = Array.from(form.elements).find(({ name }) => name === 'image');

    const image_formData = new FormData();

    for (const file of image_fileInput.files) {
      image_formData.append('file', file);
    }


    image_formData.append('upload_preset', 'app_users');

    const image_data = await fetch('https://api.cloudinary.com/v1_1/dbospsdwo/image/upload', {
      method: 'POST',
      body: image_formData
    }).then(r => r.json());

    const image_url = image_data.secure_url;


    //useEffect(()=>{
    //  const ele = document.querySelector('.buble');
    //if (ele) {
    //  ele.style.left = `${Number(value / 4)}px`;
   // }
  //})

    // post request to prediction api to create talking avatar
    const video_body = {
      image_in: image_url,
      seed: 42,
      motion: motion,
      fps: fps,
      width: 1024,
      height: 576,
      num_inference_steps: numInferenceSteps,
    };

    const video_response = await fetch("/api/i2v_predictions", {
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
      const video_response = await fetch("/api/i2v_predictions/" + videoPrediction.id);
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
      //setVideoSrc(videoPrediction.output);
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
        const cld_video_id = video_data.public_id;
        

        //console.log({ cld_video_url });
        
        setVideoPublicId(cld_video_id);
        //const videoDuration = Math.floor(video_data.duration * 60);
        

        const dateCreated = new Date();

          //update the database
        const req_body = {cld_video_id, dateCreated };
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
    setImage("");
      

  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
      
        </div>
      </div>
      
     
      
          <form onSubmit={(e) => handleOnSubmit(e)}
          >
            
            
            <div className="flex flex-col py-10">
              <label className="px-2 py-3 text-sm text-white" htmlFor="image">
                Select Picture: {"   "}{"    "}
                <span className="text-sm text-red-500">(jpg/jpeg, Max 1MB) </span>
                <span className="text-sm text-red-400">*</span>
              </label>
              <input
                type="file"
                className="upload-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900"
                name="image"
                placeholder="Select Picture"
                onChange={handleImageChange}
              />
              <img src={imageSrc} className="basis-1/2 h-auto w-48 my-5" accept="image/*" />
            </div>

            <Container className="mx-3 py-2" maxwidth="lg">
        <Box sx={{ bgcolor: '#fffcf2', height: '30vh', borderRadius: 1, }} >
            <div className="flex flex-col">
            <label className="px-2 py-3 text-sm  text-black">
                Motion (Required)
              </label>
            <Slider
             defaultValue={80}
             valueLabelDisplay="on"
             color ='success'
             step={10}
             marks
             min={10}
             max={100}
             onChange={(e) => setMotion(e.target.value)}
             name = "motion"
            />
           
           </div>
          
            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                FPS (Required)
              </label>
              <Slider
             defaultValue={6}
             valueLabelDisplay="on"
             color ='success'
             step={1}
             marks
             min={6}
             max={25}
             onChange={(e) => setFps(e.target.value)}
             name = "fps"
            />
            </div>
            

            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                Num Inference Steps (Required)
              </label>
              <Slider
             defaultValue={9}
             valueLabelDisplay="on"
             color ='success'
             step={1}
             marks
             min={5}
             max={15}
             onChange={(e) => setNumInferenceSteps(e.target.value)}
             name = "numInferenceSteps"
            />
            </div>
            </Box>
            </Container>
            
            {isOverUsageLimit?
              
              (
               <Link href="/pricing">
                 <button
                   className="hero-button text-white font-bold py-2 px-4 rounded"
                 >Buy a Plan</button>
               </Link>
             ) : (<button
               className={`hero-button w-full text-white font-bold py-2 px-4 rounded`}
               type="submit"
               disabled={isGenerating || image === "" }
             >
               {isGenerating ? "Generating..." : "Generate Video"}
             </button>) 
           }
            
            
           
          </form>
          
         
          <div className="relative flex w-full items-center justify-center py-10">
          {videoPublicId != null  && (
             <CloudinaryContext cloud_name="dbospsdwo" secure>
             <div className="herovideo-card">
               <Video
                 publicId= {videoPublicId}
                 autoPlay
                 muted
                 width="1024"
                 height="576" 
                 controls      
               />
             </div>
           </CloudinaryContext>
            
          )}
          </div>

          
          <p className="py-3 text-sm opacity-50 text-white">video status: {videoPrediction?.status}</p>
               
         
      <Disclaimer />
      <DiscordButton />
      <Text2VideoFAQ />
    </div>

  );
}

