import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { StoryContext } from "../context/StoryContext";
import useLocalStorage from "../hooks/useLocalStorage";

function VoiceOverDescription({ setActiveStep }) {
  const { storyDescription, setStoryDescription } = useContext(StoryContext);
  const { getItem} = useLocalStorage();
  const [errorMessage, setErrorMessage] = useState("");
  const videoUrlsarray = getItem("videoUrls");
  const videoUrlsCount = videoUrlsarray.individual_videos.length;

  const handleChange = (e) => {
    setStoryDescription(e.target.value);
  };

  const handleNext = () => {
    const lineCount = storyDescription
      .split("\n")
      .filter((line) => line.trim() !== "").length;

    if (videoUrlsCount !== lineCount) {
      setErrorMessage(
        `Please enter ${videoUrlsCount} sentences for ${videoUrlsCount} video clips`
      );
      return;
    }
    setActiveStep(2);
  };

  return (
    <>
      <h2 className="font-semibold mb-4">Story Description</h2>
      <textarea
        rows={
          storyDescription === ""
            ? 12
            : storyDescription.split("\n").length + 12
        }
        name="output"
        value={storyDescription}
        onChange={handleChange}
        id="output"
        placeholder="AI Generated Story Description"
        className="block w-full rounded-md bg-transparent border border-gray-400 shadow-sm focus:outline-none sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-black"
      />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="flex items-center justify-end mt-4">
        <Button
          variant="contained"
          onClick={handleNext}
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default VoiceOverDescription;
