import React, { useState, useEffect, useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,
} from "@mui/material";
import { StoryContext } from "../context/StoryContext";
import { AudioContext } from '../context/AudioContext';
import useBlobBase64 from '../hooks/useBlobBase64';
import useLocalStorage from "../hooks/useLocalStorage";

function Voices({setActiveStep}) {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [loading, setLoading] = useState(false);
  const { storyDescription } = useContext(StoryContext);
  const { setAudioUrls } = useContext(AudioContext);
  const { blobToBase64 } = useBlobBase64();
  const { setItem } = useLocalStorage();

  

  useEffect(() => {
    async function getVoices() {
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices");
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setVoices(data.voices);
      } catch (error) {
        console.log(error.message);
      }
    }

    getVoices();
  }, []);

  const handleSelectVoice = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleGenerateTTS = async () => {
    setLoading(true);
    setAudioUrls([])

    const sentences = storyDescription
      .split(".")
      .filter((sentence) => sentence.trim() !== "");

    try {
      const audioStringsArray = [];

      for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();

        const response = await fetch("/api/elevenlabs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmedSentence,
            voice: selectedVoice,
          }),
        });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
         const blob = await response.blob();
         const audioBase64=await blobToBase64(blob)
         audioStringsArray.push(audioBase64); 
        const url = URL.createObjectURL(blob);
        setAudioUrls((prevAudioUrls) => [...prevAudioUrls, url]);
        await new Promise((resolve) => setTimeout(resolve, 1000));

      }
      setItem("Base64Audio", audioStringsArray);
      setActiveStep(3)
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      throw new Error("Failed to fetch api");
    } finally {
      setLoading(false);
    }      
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select a Voice</InputLabel>
      <Select
        value={selectedVoice}
        onChange={handleSelectVoice}
        label="Select a Voice"
      >
        {voices.map((voice) => (
          <MenuItem key={voice.voice_id} value={voice.voice_id}>
            {voice.name}
          </MenuItem>
        ))}
      </Select>

      <div className="flex  justify-end">
        <Button
          variant="contained"
          onClick={handleGenerateTTS}
          disabled={loading || !selectedVoice}
          sx={{ mt: 2 }}
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Generating, please wait" : "Generate TTS"}
        </Button>
      </div>
    </FormControl>
  );
}

export default Voices;
