import React, { useContext, useEffect } from "react";
import { useRouter } from 'next/router'; // Import the useRouter hook
import { AudioContext } from "../context/AudioContext";
import useLocalStorage from '../hooks/useLocalStorage';

function AiVoiceOver() {
  const { audioUrls } = useContext(AudioContext);
  const { setItem } = useLocalStorage();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setItem("audioUrls", audioUrls);
  }, [audioUrls, setItem]);

  // Function to navigate to /final-video
  const navigateToFinalVideo = () => {
  setItem("SelectedOption","VoiceOver")
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

      {/* Add the button to navigate */}
      <button onClick={navigateToFinalVideo} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Go to Final Video
      </button>
    </div>
  );
}

export default AiVoiceOver;
