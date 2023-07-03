import { Old_Standard_TT } from "@next/font/google";
import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';
import SocialLinkBar from './SocialLinkBar';
import { isAudio, validateAudioSize, } from '../utils/fileValidation';

import TubeFAQ from './TubeFAQ';
import DiscordButton from './DiscordButton';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import {Cloudinary} from '@cloudinary/url-gen';
import {Resize} from '@cloudinary/url-gen/actions/resize';
import {Transformation} from "@cloudinary/url-gen";
import {scale, fill, crop} from "@cloudinary/url-gen/actions/resize";
import {source} from "@cloudinary/url-gen/actions/overlay";
import {image, text} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers/position";
import {vignette} from "@cloudinary/url-gen/actions/effect";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";


// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_NAME
  },
  url: {
    secure: true // force https, set to false to force http
  }
});



const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [speech, setSpeech] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPrediction, setVideoPrediction] = useState(null);

  const [videoSrc, setVideoSrc] = useState();
  const [usage, setUsage] = useState('');
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);


  const session = useSession();

  const { status, data } = session;

  //get the  3 days lag date from current date 

  var date = new Date();

  date.setDate(date.getDate() - 3);


  const fetchUserUsage = async () => {
    const user = await fetch(`/api/fetch-user-profile?email=${data?.user?.email}`);
    const res_user = await user.json();
    // check whether subscribed and the usage is not over plan limit
    if (res_user?.isSubscribed) {
      const response = await fetch(`/api/fetch-user-usage?email=${res_user?.email}&currentPeriodStart=${res_user?.currentPeriodStart}`);
      const result = await response.json();
      //setUsage(response.usage);
      console.log(result?._sum.video_duration);
      setUsage(result?._sum.video_duration);
      switch (res_user?.productSubscribed) {
        case "price_1Mw6i7Dfv2951nlDALJ1T3TO":
          if (result?._sum.video_duration < 5 * 60 * 60) {
            setIsOverUsageLimit(false);
          }
          break;
        case "price_1Mw6lvDfv2951nlDJdONFBJ1":
          if (result?._sum.video_duration < 15 * 60 * 60) {
            setIsOverUsageLimit(false);
          }
          break;
        case "price_1N8R7vDfv2951nlD2mhgqAuo":
          if (result?._sum.video_duration < 45 * 60 * 60) {
            setIsOverUsageLimit(false);
          }
          break;
      }
    }
    // check whether user is on trial and is not expired
    else if (res_user?.onTrial && new Date(res_user?.trialStartAt) > date) {
      if (res_user?.creations?.length == 0) {
        setIsOverUsageLimit(false);
      }
      else {
        const response = await fetch(`/api/fetch-trial-usage?email=${res_user?.email}&trialStartAt=${res_user?.trialStartAt}`);
        const result = await response.json();
        if (result?._sum.video_duration < 3 * 60 * 60) {
          setIsOverUsageLimit(false);
        }
      }
    }
  };

  useEffect(() => {

    fetchUserUsage();

  });


  const handleOnSubmit = async (event) => {

    event.preventDefault();


    // post request to prediction api to create talking avatar
    const video_body = {
      youtube_video_url: youtubeUrl,
      Text: speech,
      start_time: startTime,
      end_time: endTime,
    };

    const video_response = await fetch("/api/tube_predictions", {
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
      const video_response = await fetch("/api/tube_predictions/" + videoPrediction.id);
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
        const cld_video_id = video_data.public_id;
        const cld_video_duration = Math.floor(video_data.duration * 60);
        

        const myVideo = cld.video(cld_video_id);
        // Import the resize transformation and apply it to myImage
        // Resize the image to 100x100
        myVideo
        .resize(Resize.scale().width(640).height(360))
        .overlay(
        source(
        image('ai_mark_ekzt6i')
        .transformation(new Transformation()
        .resize(scale().width(100))
        .effect(vignette())
        )
        )
        .position(new Position().gravity(compass('south_east')).offsetY(5)) 
        );

       // When we're done, we can apply all our changes and create a URL.
        const cld_video_url = myVideo.toURL();

        setVideoSrc(cld_video_url);
        setVideoUrl(cld_video_url);


        const prisma_body = { cld_video_url, cld_video_id, cld_video_duration };
        await fetch('/api/creation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prisma_body),
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

          {isOverUsageLimit ?
            (
              <Link href="/pricing">
                <button
                  className="hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >Buy a Plan</button>
              </Link>
            ) :
            (<div className="mx-auto mt-10 max-w-xs sm:flex sm:max-w-none sm:justify-center">
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
              <label className="text-white" htmlFor="youtubeUrl">
                Youtube URL
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="youtubeUrl"
                placeholder="Youtube URL (required)"
                id="youtubeUrl"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
            </div>


            <div className="flex flex-col">
              <label htmlFor="speech" className="text-white">
                Speech
              </label>
              <textarea
                rows={7}
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
                required
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Speech (Required)"
                type="text"
                name="speech"
                id="speech"
              />
            </div>


            <div className="flex flex-col">
              <label className="text-white" htmlFor="startTime">
                Video Start Time
              </label>

              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="startTime"
                id="startTime"
                type="text"
                placeholder="Time format as 00:00:00 (Required)"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="endTime">
                Video End Time
              </label>
              <input
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="endTime"
                id="endTime"
                type="text"
                placeholder="Time format as 00:00:00 (Required)"
              />
            </div>

            {isOverUsageLimit ?
              (
                <Link href="/pricing">
                  <button
                    className="hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >Buy a Plan</button>
                </Link>
              ) :
              (<button
                className={`hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || youtubeUrl === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                type="submit"
                disabled={isGenerating || youtubeUrl === ""}
              >
                {isGenerating ? "Generating..." : "Generate Youtube Video"}
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



      <DiscordButton />
      <SocialLinkBar url={videoUrl} />

      <TubeFAQ />
    </div>

  );
}


