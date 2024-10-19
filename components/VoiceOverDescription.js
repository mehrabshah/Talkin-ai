import React, { useContext } from "react";
import { Button } from "@mui/material";
import { StoryContext } from "../context/StoryContext";

function VoiceOverDescription({ setActiveStep }) {
  const { storyDescription, setStoryDescription } = useContext(StoryContext);

  const handleChange = (e) => {
    setStoryDescription(e.target.value);
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
      <div className="flex items-center justify-end mt-4">
        <Button
          variant="contained"
          onClick={() => setActiveStep(2)}
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default VoiceOverDescription;
