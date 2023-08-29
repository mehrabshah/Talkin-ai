import Link from 'next/link';
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { isImage, isAudio, validateImgSize, validateAudioSize, } from '../utils/fileValidation';
import { useContext, useEffect } from 'react';
//import FAQ from './FAQ';
import Disclaimer from './Disclaimer';
import SocialLinkBar from './SocialLinkBar';
import AvatarFAQ from './AvatarFAQ';
import DiscordButton from './DiscordButton';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { Gate, useSubscription } from "use-stripe-subscription";
import { checkNewUserTrial} from "../utils/functions";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {

  const [events, setEvents] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [audioPrediction, setAudioPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState();
  const [audioSrc, setAudioSrc] = useState();
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  
  const [image, setImage] = useState();
  const [audio, setAudio] = useState();
  const [imageError, setImageError] = useState();
  const [audioError, setAudioError] = useState();
  const [videoUrl, setVideoUrl] = useState('');
  const [usage, setUsage] = useState('');

  const [audioFile, setAudioFile] = useState();
  
  const [speech, setSpeech] = useState("");
  
  const [voice, setVoice] = useState("");
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);
  

  const [isCustomAudio, setIsCustomAudio] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);
  const [startDate, setStartDate] =  useState("");
  

  const {
    subscription,
  } = useSubscription();

  const { isSignedIn, user } = useUser();


  const fetchUserUsage = async () => {
    
    const userId = user?.id;
    // check whether subscribed and the usage is not over plan limit
    if (subscription !=null) {
      
      
      const subscriptionStart= subscription.start_date;

      setStartDate(subscriptionStart);

      const response = await fetch(`/api/fetch_usage?startDate=${subscriptionStart}`);
      const result = await response.json();
      const subscriptionUsage = result.usage;
      //const response = await fetch(`/api/fetch_usage?subscriptionStart=${subscription?.start_date}`);
      //const result = await response.json();
      //console.log(response);
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
			   
        //toast.error("You have used new user trial!");
        setIsOverUsageLimit(true);
        setNewUser(false);
        //errorMessage("You have used new user trial.");
			
		  } else {
         setIsOverUsageLimit(false);
			   setNewUser(true);
         //successMessage("Start your trial today🎉");
			   //toast.success("Start your trial today!");
		  }
    }

  }
  useEffect(() => {

    fetchUserUsage();
    
    });
  
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

  const handleAudioChange = async (e) => {
    setAudioError('');
    const audio = e.target.files[0];
    // if no audio selected
    if (!audio) {
      return;
    }

    // check if audio
    const result = isAudio(audio.name);
    if (!result) {
      const error = 'File type should be a audio file';
      toast(error, { type: 'error' });
      setAudioError(error);
      return;
    }
    const isAudioLarge = validateAudioSize(audio);
    if (isAudioLarge) {
      const error = 'File must be less or equal to 2MB';
      toast(error, { type: 'error' });
      setAudioError(error);
      return;
    }
    const reader = new FileReader();
    // converts to BASE 64
    reader.readAsDataURL(audio);
    reader.addEventListener('load', () => {
      //setCustomAudioSrc(reader.result);
      setIsCustomAudio(true);
      setAudio(audio);
      console.log(isCustomAudio);
    });


  };






  //handle form submit to create avatar and create record in the database
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

    const audio_fileInput = Array.from(form.elements).find(({ name }) => name === 'audio');




    const audio_formData = new FormData();

    for (const file of audio_fileInput.files) {
      audio_formData.append('file', file);
    }


    audio_formData.append('upload_preset', 'app_users');

    const audio_data = await fetch('https://api.cloudinary.com/v1_1/dbospsdwo/video/upload', {
      method: 'POST',
      body: audio_formData
    }).then(r => r.json());




    const customAudioUrl = audio_data.secure_url;

    setCustomAudioUrl(audio_data.secure_url);


    // post request to prediction api to create talking avatar
    if (isCustomAudio) {

      var audio_body = {
        Text: speech,

        //voice_a: voice,
        custom_voice: customAudioUrl,
      };
    }
    else {

      var audio_body = {
        Text: speech,

        voice_a: voice,
        //custom_voice: customAudioUrl,

      };
    }




    const audio_response = await fetch("/api/tts_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        audio_body),
    });


    let audioPrediction = await audio_response.json();
    if (audio_response.status !== 201) {
      setError(audioPrediction.detail);
      setAudioPrediction(audioPrediction);
      return;
    }
    setAudioPrediction(audioPrediction);

    while (
      audioPrediction.status !== "succeeded" &&
      audioPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const audio_response = await fetch("/api/tts_predictions/" + audioPrediction.id);
      audioPrediction = await audio_response.json();
      if (audio_response.status !== 200) {
        setError(audioPrediction.detail);
        return;
      }
      console.log({ audioPrediction });
      setAudioPrediction(audioPrediction);
    }
    if (audioPrediction.status == "succeeded") {
      setAudioPrediction(audioPrediction);
      setAudioSrc(audioPrediction.output);
    }





    const audio_url = audioPrediction?.output;
    //setImageSrc(data.secure_url);

    // post request to prediction api to create talking avatar
    const body = {
      image_in: image_url,
      audio_in: audio_url,
    };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        body),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }

    // post request to creation api to create creation record in the database
    if (prediction.status == "succeeded") {
      const video_url = prediction.output;

      try {
        // upload to cloudinary
        const video_formData = new FormData();
        video_formData.append('file', video_url);
        video_formData.append('upload_preset', 'talking_avatar');

        const video_data = await fetch('https://api.cloudinary.com/v1_1/dbospsdwo/video/upload', {
          method: 'POST',
          body: video_formData
        }).then(r => r.json());

        //const cld_video_url = video_data.secure_url;
        //const cld_video_id = video_data.public_id;
        const videoDuration = Math.floor(video_data.duration * 60);
        setVideoUrl(video_data.secure_url);

        try {

          
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

      } catch (error) {
        console.error(error);
      }



    }
  };



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
            ) : (<div className="mx-auto mt-10 max-w-xs sm:flex sm:max-w-none sm:justify-center">
            <a target="_blank" href="https://www.talkin-ai.asia">
              <button
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-orange-600 shadow-sm hover:bg-gray-500 sm:px-8"
              >
                <span className="text-xl md:text-2xl"><BsFillPlayCircleFill /></span>
                <span> Use ChatGPT to Create Speech</span>
              </button>
            </a>
          </div>) 
          }

          <form onSubmit={(e) => handleOnSubmit(e)}>

            <div className="flex flex-col py-10">
              <label className="text-white" htmlFor="image">
                Select Picture: {"   "}{"    "}
                <span className="text-red-500">(jpg/jpeg, Max 1MB) </span>
                <span className="text-red-400">*</span>
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

            <div className="flex flex-col">
              <label htmlFor="speech" className="text-white">
                Speech for AI
              </label>
              <textarea
                rows={7}
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
                name="speech"
                id="speech"
                placeholder="Speech for AI (Required)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white" htmlFor="voice">
                Option 1: Select voice
              </label>

              <select
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="voice"
                id="voice"
                type="text"
                placeholder="Select Voice"
              >
                <option value="">Select Voice</option>
                <option value="en-US-Male-A">en-US-Male-A</option>
                <option value="en-US-Female-B">en-US-Female-B</option>
                <option value="en-US-Male-C">en-US-Male-C</option>
                <option value="en-US-Female-D">en-US-Female-D</option>
                <option value="en-GB-Male-E">en-GB-Male-E</option>
                <option value="en-GB-Female-F">en-GB-Female-F</option>
                <option value="en-AU-Male-G">en-AU-Male-G</option>
                <option value="en-AU-Female-H">en-AU-Female-H</option>
                <option value="Cage">Cage</option>
                <option value="Fifth_Element">Fifth_Element</option>
                <option value="Musk">Musk</option>
                <option value="Obama">Obama</option>
                <option value="Queen">Queen</option>
                <option value="Shrek">Shrek</option>
                <option value="Samuel_Jackson">Samuel_Jackson</option>
                <option value="Tom">Tom</option>
                <option value="Trump">Trump</option>
                <option value="Young_Kid">Young Kid</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="audio">
                Option 2: Upload custom voice {"   "}{"    "}
                <span className="text-red-500">(wav/mp3, Max 2MB)</span>
                <span className="text-red-400">*</span>
              </label>
              <input
                type="file"
                className="upload-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900"
                name="audio"
                placeholder="Upload custom voice file"
                onChange={handleAudioChange}
              />
            </div>


            {isOverUsageLimit?
              
               (
                <Link href="/pricing">
                  <button
                    className="hero-button text-white font-bold py-2 px-4 rounded"
                  >Buy a Plan</button>
                </Link>
              ) : (<button
                className={`hero-button w-full text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || audioPrediction === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                type="submit"
                disabled={isGenerating || audioPrediction === ""}
              >
                {isGenerating ? "Generating..." : "Generate Talking Avatar"}
              </button>) 
            }
          </form>
        </div>




        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>

            {audioPrediction?.output && (
              <div >
                <audio controls muted autoPlay
                  //src={prediction.output[prediction.output.length - 1]}
                  src={audioSrc}
                  alt="output"
                />
              </div>
            )}

            {prediction?.output && (
              <div >
                <video controls muted autoPlay
                  //src={prediction.output[prediction.output.length - 1]}
                  src={prediction.output}
                  alt="output"
                />
              </div>
            )}
             <p className="py-3 text-sm opacity-50">start date: {startDate}</p>
             <p className="py-3 text-sm opacity-50">usage: {usage}</p>
            <p className="py-3 text-sm opacity-50">audio status: {audioPrediction?.status}</p>
            <p className="py-3 text-sm opacity-50">video status: {prediction?.status}</p>
            <p className="py-3 text-sm opacity-50">video url: {videoUrl}</p>
          </div>
        </div>
      </div>

      <Disclaimer />
      <DiscordButton />
      <SocialLinkBar url={videoUrl} />


      <AvatarFAQ />


    </div>


  );
}


