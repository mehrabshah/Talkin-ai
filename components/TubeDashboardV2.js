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


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {

  const [videoYoutubeUrl, setVideoYoutubeUrl] = useState("");

  const [audioYoutubeUrl, setAudioYoutubeUrl] = useState("");

  const [speech, setSpeech] = useState("");

  const [videoStartTime, setVideoStartTime] = useState("");
  const [videoEndTime, setVideoEndTime] = useState("");

  const [audioStartTime, setAudioStartTime] = useState("");
  const [audioEndTime, setAudioEndTime] = useState("");

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
      video_youtube_video_url: videoYoutubeUrl,
      video_start_time: videoStartTime,
      video_end_time: videoEndTime,
      audio_youtube_video_url: audioYoutubeUrl,
      audio_start_time: audioStartTime,
      audio_end_time: audioEndTime,

    };

    const video_response = await fetch("/api/tube_predictions_v2", {
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
      const video_response = await fetch("/api/tube_predictions_v2/" + videoPrediction.id);
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

        const cld_video_url = video_data.secure_url;
        const cld_video_id = video_data.public_id;
        const cld_video_duration = Math.floor(video_data.duration * 60);

        setVideoUrl(video_data.secure_url);


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
          <form onSubmit={(e) => handleOnSubmit(e)}>
            
          <div className="flex flex-col py-10">
              <label className="text-white" htmlFor="videoYoutubeUrl">
                Video Youtube URL
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="videoYoutubeUrl"
                placeholder="Video Youtube URL (required)"
                id="audioYoutubeUrl"
                value={videoYoutubeUrl}
                onChange={(e) => setVideoYoutubeUrl(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="videoStartTime">
                Video Start Time
              </label>

              <input
                value={videoStartTime}
                onChange={(e) => setVideoStartTime(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="videoStartTime"
                id="videoStartTime"
                type="text"
                placeholder="Time format as 00:00:00 (Required)"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="videoEndTime">
                Video End Time
              </label>
              <input
                value={videoEndTime}
                onChange={(e) => setVideoEndTime(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="videoEndTime"
                id="videoEndTime"
                type="text"
                placeholder="Time format as 00:00:00 (Required)"
              />
            </div>
            
            <div className="flex flex-col py-10">
              <label className="text-white" htmlFor="audioYoutubeUrl">
                Audio Youtube URL
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="audioYoutubeUrl"
                placeholder="Audio Youtube URL (required)"
                id="audioYoutubeUrl"
                value={audioYoutubeUrl}
                onChange={(e) => setAudioYoutubeUrl(e.target.value)}
              />
            </div>


            <div className="flex flex-col">
              <label className="text-white" htmlFor="audioStartTime">
                Audio Start Time
              </label>

              <input
                value={audioStartTime}
                onChange={(e) => setAudioStartTime(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="audioStartTime"
                id="audioStartTime"
                type="text"
                placeholder="Time format as 00:00:00 (Required)"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white" htmlFor="audioEndTime">
                Audio End Time
              </label>
              <input
                value={audioEndTime}
                onChange={(e) => setAudioEndTime(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="audioEndTime"
                id="audioEndTime"
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
                  ${isGenerating || videoYoutubeUrl === "" || audioYoutubeUrl === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                type="submit"
                disabled={isGenerating || videoYoutubeUrl === "" || audioYoutubeUrl === ""}
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


