"use client";

import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useBlobBase64 from '../hooks/useBlobBase64';

function AiVoiceOver() {
  const { getItem } = useLocalStorage();
  const { base64ToBlob } = useBlobBase64();
  const [finalVideoUrl, setFinalVideoUrl] = useState(null);
  const [finalVideoBackgroundUrl,setFinalVideoBackgroundUrl]= useState(null) 

  useEffect(() => {
    const savedFinalVideoUrl = getItem("FinalVideoUrl");
    if (savedFinalVideoUrl) {
      setFinalVideoUrl(savedFinalVideoUrl);
    }
    
    const storedAudioUrls = getItem("Base64Audio");
    const storedVideoUrls = getItem("videoUrls");
    const backgroundUrls = getItem("selectedBackground")
    const selectedOption = getItem("SelectedOption")
    const FinalvideoUrls = getItem("FinalvideoUrls")

    if(selectedOption=="BackgroundVoice")
    {
      mergeVideoAudioBackground(backgroundUrls,FinalvideoUrls)
    }
    else if(selectedOption=="VoiceOver")
    {
      mergeAllAudioVideos(storedAudioUrls, storedVideoUrls.individual_videos);
    }


  },[]);

  const mergeAllAudioVideos = async (audioList, videoList) => {


    if (audioList.length !== videoList.length) {
      console.error("Audio and video arrays must have the same length.");
      return;
    }

    try {
      const response = await fetch("/api/final_video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: audioList,
          video: videoList,
        }),
      });

      const result = await response.json();
    
      if (response.ok) {
        setFinalVideoUrl(result.url);
        setItem("FinalVideoUrl", result.url);


      } else {
        console.error(`Error merging audio and video: ${result.error}`);
      }
    } catch (error) {
      console.error("Error merging audio and video:", error);
    }
  };



  const mergeVideoAudioBackground= async (audioList, videoList)=>{
    try {
      const response = await fetch("/api/final_video_background", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audio: audioList,
          video: videoList,
        }),
      });

      const result = await response.json();
    
      if (response.ok) {
        setFinalVideoUrl(result.url);
        setItem("FinalVideoUrl", result.url);


      } else {
        console.error(`Error merging audio and video: ${result.error}`);
      }
    } catch (error) {
      console.error("Error merging audio and video:", error);
    }

  }

  // Function to download the video
  const handleDownload = () => {
    if (finalVideoUrl) {
      const link = document.createElement('a');
      link.href = finalVideoUrl;
      link.download = 'merged_video.mp4';
      link.click();
    }
  };

  return (
    <div className="container">
      {finalVideoUrl ? (
        <div className="video-container">
          <video className="responsive-video" controls>
            <source src={finalVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="download-button" onClick={handleDownload}>
            Download Video
          </button>
        </div>
      ) : (
        <p>Processing videos, please wait...</p>
      )}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .video-container {
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }

        .responsive-video {
          width: 100%;
          max-width: 600px;
          height: auto;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        .download-button {
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007BFF;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .download-button:hover {
          background-color: #0056b3;
        }

        @media (max-width: 768px) {
          .responsive-video {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default AiVoiceOver;
