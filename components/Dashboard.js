import { Old_Standard_TT } from "@next/font/google";
import React, { useState } from "react";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {
  const [videoScription, setVideoScription] = useState("");

  const [audioFile, setAudioFile] = useState();
  const [role, setRole] = useState("");
  const [topic, setTopic] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");
  const [voice, setVoice] = useState("");
  const [error, setError] = useState("");
  const [usage, setUsage] = useState('');
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);


  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [audioSrc, setAudioSrc] = useState();

  const handleCopy = () => {
    navigator.clipboard.writeText(videoScription);
    setIsCopied(true);
  };

  const session = useSession();

  const { status, data } = session;


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
    setIsGenerating(true);
    const res = await fetch("/api/returnVideoScription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        topic,
        keyWords,
        tone,
        numWords,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    //setVideoScription(data.videoScription.trim());
    setVideoScription(data.videoScription);
  };




  return (
    <div className="max-w-7xl w-full h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="role">
                Role (Optional)
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="role"
                placeholder="Professional speech writer (Optional)"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="topic" className="sr-only">
                Topic
              </label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Topic (Required)"
                type="text"
                name="topic"
                id="topic"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                Keywords for AI (Optional)
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="Keywords for AI (Optional)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tone"
                id="tone"
              >
                <option value="default">Select Tone (Optional)</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Words (Optional)
              </label>
              <input
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
                type="number"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Number Of Words - Max 200 (Optional)"
                name="words"
                id="words"
              />
            </div>

            {isOverUsageLimit ?
              (
                <Link href="/pricing">
                  <button
                    className="hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >Buy a Plan</button>
                </Link>
              ) : (<button
                className={`hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${isGenerating || topic === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                  }`}
                type="submit"
                disabled={isGenerating || topic === ""}
              >
                {isGenerating ? "Generating..." : "Generate Speech Text"}
              </button>)
            }

          </form>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                videoScription === ""
                  ? 7
                  : videoScription.split("\n").length + 12
              }
              name="output"
              value={videoScription}
              onChange={(e) => setVideoScription(e.target.value)}
              disabled={videoScription === ""}
              id="output"
              placeholder="AI Generated Video Scription"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={videoScription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>

          </div>
        </div>
      </div>


    </div>


  );
}


