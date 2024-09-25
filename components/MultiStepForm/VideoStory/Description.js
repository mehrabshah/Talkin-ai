import { Button } from "@mui/material";

export const Description = ({
  setActiveStep,
  storyDescription,
  setStoryDescription,
  handleOnSubmit,
}) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Story Discription</h2>
      <textarea
        rows={
          storyDescription === ""
            ? 12
            : storyDescription.split("\n").length + 12
        }
        name="output"
        value={storyDescription}
        onChange={(e) => setStoryDescription(e.target.value)}
        id="output"
        placeholder="AI Generated Story Description"
        className="block w-full rounded-md bg-transparent border border-gray-400 shadow-sm focus:outline-none sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
      />
      <div className="flex items-center justify-between mt-4">
        <Button variant="outlined" onClick={() => setActiveStep(4)}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!storyDescription?.length}
          className="bg-[#5bbcff] disabled:bg-gray-600 disabled:!text-white"
          onClick={handleOnSubmit}
        >
          Generate Video Story
        </Button>
      </div>
    </>
  );
};
