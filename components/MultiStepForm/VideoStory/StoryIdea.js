import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const StoryIdea = ({ setActiveStep, formik, isGenerating }) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Story Idea</h2>
      <input
        {...formik?.getFieldProps("idea")}
        className="block w-full rounded-md bg-transparent border border-gray-400 shadow-sm focus:outline-none   sm:text-sm px-4 py-3.5 placeholder-gray-500 my-2 text-white"
        placeholder="Idea"
        type="text"
        name="idea"
        id="idea"
      />
      {formik?.touched?.idea && formik?.errors?.idea && (
        <span className="block text-sm text-red-500 font-light mt-2">
          {formik?.errors?.idea}
        </span>
      )}
      <h2 className="font-semibold my-4">Number of Panels</h2>
      <FormControl className="w-full">
        <RadioGroup
          className="gap-3 w-full md:flex-row flex-col"
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          {...formik.getFieldProps("numPanels")}
        >
          <FormControlLabel
            value="four"
            control={<Radio className="text-white" />}
            label="Four"
            className="border border-gray-400 rounded-md mx-0 flex-1 "
          />
          <FormControlLabel
            value="five"
            control={<Radio className="text-white" />}
            label="Five"
            className="border border-gray-400 rounded-md mx-0 flex-1"
          />
          <FormControlLabel
            value="six"
            control={<Radio className="text-white" />}
            label="Six"
            className="border border-gray-400 rounded-md mx-0 flex-1"
          />
          <FormControlLabel
            value="seven"
            control={<Radio className="text-white" />}
            label="Seven"
            className="border border-gray-400 rounded-md mx-0 flex-1"
          />
          <FormControlLabel
            value="eight"
            control={<Radio className="text-white" />}
            label="Eight"
            className="border border-gray-400 rounded-md mx-0 flex-1"
          />
          <FormControlLabel
            value="nine"
            control={<Radio className="text-white" />}
            label="Nine"
            className="border border-gray-400 rounded-md mx-0 flex-1"
          />
        </RadioGroup>
      </FormControl>
      {formik?.touched?.numPanels && formik?.errors?.numPanels && (
        <span className="block text-sm text-red-500 font-light mt-2">
          {formik?.errors?.numPanels}
        </span>
      )}
      <div className="flex items-center gap-2 mt-4 justify-between">
        <Button
          variant="contained"
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
          onClick={() => setActiveStep(3)}
        >
          Back
        </Button>
        {!isGenerating ? (
          <Button
            variant="contained"
            onClick={formik?.handleSubmit}
            className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
          >
            Generate Story
          </Button>
        ) : (
          <IconButton className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff] text-white">
            <AiOutlineLoading3Quarters className="text-white animate-spin" />
          </IconButton>
        )}
      </div>
    </>
  );
};
