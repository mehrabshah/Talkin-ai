import React, { useState } from "react";
import { Gallery } from "../data/Gallery";
import { Radio, FormControlLabel, Button } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



function BackgroundMusic() {
  const router = useRouter();
  const [uploadedTracks, setUploadedTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const { setItem } = useLocalStorage();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch("/api/upload_file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const trackPath = result.path; 
        setUploadedTracks((prevTracks) => [
          ...prevTracks,
          { name: file.name, path: trackPath },
        ]);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    }
  };

  const generateFinalVideo = () => {
    if (!selectedTrack) {
      toast.error("Please select a background track before proceeding."); 
      return;
    }
    setItem("SelectedOption", "BackgroundVoice");
    router.push("/final-video");
  };

  const handleTrackSelect = (src) => {
    setSelectedTrack(src);
    setItem("selectedBackground", src);
  };

  return (
    <div>
      <div>
        <h1 className="font-bold">Select Custom Music</h1>
        <div className="my-4 flex items-center justify-center flex-col">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="mt-2 mb-4 cursor-pointer"
          />
        </div>
      </div>
      <div>
        <h1 className="font-bold">Uploaded Music</h1>
        <div className="grid grid-cols-1 gap-4 my-8">
          {uploadedTracks.map((track, index) => (
            <div key={index} className="flex flex-row items-center">
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedTrack === track.path}
                    onChange={() => handleTrackSelect(track.path)}
                  />
                }
                label={track.name}
              />
              <audio controls className="mt-2">
                <source src={track.path} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="font-bold">Gallery</h1>
        <div className="flex flex-col my-8">
          {Gallery.map((track) => (
            <div key={track.id} className="flex flex-row items-center">
              <FormControlLabel
                control={
                  <Radio
                    checked={selectedTrack === track.src}
                    onChange={() => handleTrackSelect(track.src)}
                  />
                }
                label={track.name}
              />
              <audio controls className="mt-2">
                <source src={track.src} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
        <Button
          variant="contained"
          onClick={generateFinalVideo}
          className="ml-4"
        >
          Generate Final Video
        </Button>
        </div>
      </div>
    </div>
  );
}

export default BackgroundMusic;
