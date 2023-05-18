import { Old_Standard_TT } from "@next/font/google";
import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';
import SocialLinkBar from './SocialLinkBar';
import { isAudio, validateAudioSize, } from '../utils/fileValidation';

import TubeFAQ from './TubeFAQ';
import DiscordButton from './DiscordButton';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {
  const [videoScription, setVideoScription] = useState("");

  const [audioFile, setAudioFile] = useState();
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [speech, setSpeech] = useState("");

  const [voice, setVoice] = useState("");
  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState('');

  const [isGenerated, setIsGenerated] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [audioPrediction, setAudioPrediction] = useState(null);
  const [videoPrediction, setVideoPrediction] = useState(null);
  const [audioSrc, setAudioSrc] = useState();
  const [videoSrc, setVideoSrc] = useState();
  const [usage, setUsage] = useState('');
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);
  const [audio, setAudio] = useState();
  const [isCustomAudio, setIsCustomAudio] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioError, setAudioError] = useState();


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



  const handleSubmit = async (e) => {
    e.preventDefault();
    //setIsGenerated(true);

    // post request to prediction api to create talking avatar

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





  const handleOnSubmit = async (event) => {

    event.preventDefault();

    const form = event.currentTarget;

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

    setCustomAudioUrl(audio_data.secure_url);




    const customAudioUrl = audio_data.secure_url;


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


    const response = await fetch("/api/tts_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        audio_body),
    });
    let audioPrediction = await response.json();
    if (response.status !== 201) {
      setError(audioPrediction.detail);
      return;
    }
    setAudioPrediction(audioPrediction);

    while (
      audioPrediction.status !== "succeeded" &&
      audioPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/tts_predictions/" + audioPrediction.id);
      audioPrediction = await response.json();
      if (response.status !== 200) {
        setError(audioPrediction.detail);
        return;
      }
      console.log({ audioPrediction });
      //setAudioPrediction(audioPrediction);
    }
    if (audioPrediction.status == "succeeded") {
      setAudioPrediction(audioPrediction);
      setAudioSrc(audioPrediction.output);

      // post request to prediction api to create talking avatar
      const video_body = {
        youtube_video_url: youtubeUrl,
        audio_in: audioPrediction.output,
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

  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="youtubeUrl">
                Youtube URL (required)
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
              <label htmlFor="speech" className="sr-only">
                Speech
              </label>
              <input
                value={speech}
                onChange={(e) => setSpeech(e.target.value)}
                required
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Speech to Change (Required)"
                type="text"
                name="speech"
                id="speech"
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
                className="hero-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900"
                name="audio"
                placeholder="Upload custom voice file"
                onChange={handleAudioChange}
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
                  ${isGenerating || audioPrediction === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                type="submit"
                disabled={isGenerating || audioPrediction === ""}
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
          <p className="py-3 text-sm opacity-50 text-white">audio status: {audioPrediction?.status}</p>
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


