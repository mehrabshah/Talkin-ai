import { Button, IconButton } from "@mui/material";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Description = ({ setActiveStep, formik, isGenerating }) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Story Discription</h2>
      <textarea
        rows={
          formik?.values?.storyDescription === ""
            ? 12
            : formik?.values?.storyDescription?.split("\n").length + 12
        }
        name="output"
        {...formik?.getFieldProps("storyDescription")}
        id="output"
        placeholder="AI Generated Story Description"
        className="block w-full rounded-md bg-transparent border border-gray-400 shadow-sm focus:outline-none sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
      />
      {formik?.touched?.storyDescription &&
        formik?.errors?.storyDescription && (
          <span className="block text-sm text-red-500 font-light mt-2">
            {formik?.errors?.storyDescription}
          </span>
        )}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="contained"
          className="bg-[#5bbcff] disabled:bg-gray-600 disabled:!text-white"
          onClick={() => setActiveStep(4)}
          disabled={isGenerating}
        >
          Back
        </Button>
        {isGenerating ? (
          <IconButton className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff] text-white">
            <AiOutlineLoading3Quarters className="text-white animate-spin" />
          </IconButton>
        ) : (
          <Button
            variant="contained"
            className="bg-[#5bbcff] disabled:bg-gray-600 disabled:!text-white"
            onClick={formik?.handleSubmit}
          >
            Generate Video Story
          </Button>
        )}
      </div>
    </>
  );
};
