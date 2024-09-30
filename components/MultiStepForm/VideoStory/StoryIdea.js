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
      <FormControl fullWidth>
        <RadioGroup
          sx={{
            flexDirection: { md: "row", xs: "column" },
            flexWrap: "wrap",
            gap: 1,
          }}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          {...formik.getFieldProps("numPanels")}
        >
          <FormControlLabel
            value="four"
            control={
              <Radio
                className="text-white !mx-0"
                style={{ marginInline: "0px !important" }}
              />
            }
            label="Four"
            className="border border-gray-400 rounded-md !mx-0 flex-1 "
            style={{ marginInline: "0px !important" }}
          />
          <FormControlLabel
            value="five"
            control={
              <Radio
                className="text-white !mx-0"
                style={{ marginInline: "0px !important" }}
              />
            }
            label="Five"
            className="border border-gray-400 rounded-md !mx-0 flex-1"
            style={{ marginInline: "0px !important" }}
          />
          <FormControlLabel
            value="six"
            control={
              <Radio
                className="text-white !mx-0"
                style={{ marginInline: "0px !important" }}
              />
            }
            label="Six"
            className="border border-gray-400 rounded-md !mx-0 flex-1"
            style={{ marginInline: "0px !important" }}
          />
          <FormControlLabel
            value="seven"
            control={
              <Radio
                className="text-white !mx-0"
                style={{ marginInline: "0px !important" }}
              />
            }
            label="Seven"
            className="border border-gray-400 rounded-md !mx-0 flex-1"
            style={{ marginInline: "0px !important" }}
          />
          <FormControlLabel
            value="eight"
            control={
              <Radio
                className="text-white !mx-0"
                style={{ marginInline: "0px !important" }}
              />
            }
            label="Eight"
            className="border border-gray-400 rounded-md !mx-0 flex-1"
            style={{ marginInline: "0px !important" }}
          />
          <FormControlLabel
            value="nine"
            control={
              <Radio
                className="text-white !mx-0"
                style={{ marginInline: "0px !important" }}
              />
            }
            label="Nine"
            className="border border-gray-400 rounded-md !mx-0 flex-1"
            style={{ marginInline: "0px !important" }}
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
