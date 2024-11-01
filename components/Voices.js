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
import { AudioContext } from "../context/AudioContext";
import useBlobBase64 from "../hooks/useBlobBase64";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";

function Voices({ setActiveStep }) {
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

  const getSilentAudioBlob = async () => {
    try {
      const response = await fetch("/api/silent_audio");
      if (!response.ok) throw new Error("Failed to fetch silent audio");

      const data = await response.json();
      const base64Audio = data.audioData;

      const responseBlob = await fetch(base64Audio);
      const blob = await responseBlob.blob();

      return blob;
    } catch (error) {
      console.error("Error fetching silent audio blob:", error);
      return null;
    }
  };

  const handleSelectVoice = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handleGenerateTTS = async () => {
    setLoading(true);
    setAudioUrls([]);

    const sentences = storyDescription.split("\n");

    try {
      const audioStringsArray = [];

      for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();
    console.log("trimmedSentence",trimmedSentence)

        let audioBase64;

        if (trimmedSentence === "") {
          const silentBlob = await getSilentAudioBlob();
          audioBase64 = await blobToBase64(silentBlob);
          const url = URL.createObjectURL(silentBlob);
          setAudioUrls((prevAudioUrls) => [...prevAudioUrls, url]);
        } else {
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
          audioBase64 = await blobToBase64(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrls((prevAudioUrls) => [...prevAudioUrls, url]);
        }

        audioStringsArray.push(audioBase64);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setItem("Base64Audio", audioStringsArray);
      setActiveStep(3);
    } catch (error) {
      setLoading(false);
      toast.error("We encountered an issue.Please Try Again");
      throw new Error("Failed to fetch api");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
      <ToastContainer />
    </div>
  );
}

export default Voices;
