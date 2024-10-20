import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router"; 
import { AudioContext } from "../context/AudioContext";
import useLocalStorage from "../hooks/useLocalStorage";

function AiVoiceOver() {
  const { audioUrls } = useContext(AudioContext);
  const { setItem } = useLocalStorage();
  const router = useRouter(); 

  useEffect(() => {
    setItem("audioUrls", audioUrls);
  }, [audioUrls, setItem]);


  const navigateToFinalVideo = () => {
    setItem("SelectedOption", "VoiceOver");
    router.push("/final-video");
  };

  return (
    <div>
      {audioUrls.map((url, index) => (
        <audio key={index} controls className="mt-2">
          <source src={url} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      ))}
      <div className=" flex justify-end">
        <button
          onClick={navigateToFinalVideo}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Generate Final Video
        </button>
      </div>
    </div>
  );
}

export default AiVoiceOver;
