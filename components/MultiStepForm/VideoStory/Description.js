import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { StoryContext } from "../../../context/StoryContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";


import ColorlibStepper from "./../../ColorlibStepper";

const steps = [
  "Initial",
  "Starting",
  "Processing",
  "Final",
];


export const Description = ({
  setActiveStep,
  formik,
  isGenerating,
  status,
}) => {
  const { setStoryDescription } = useContext(StoryContext);
  const [activeStepper, setActiveStepper] = useState(0);



  useEffect(()=>{
    switch (status) {
      case "null":
         setActiveStepper(0)
          break;
      case "starting":
          setActiveStepper(1)
          break;
      case "processing":
          setActiveStepper(2)
          break;
      case "succeeded":
          setActiveStepper(3)
          break;
      default:
          console.log("Unknown status.");
  }
  },[status])


  useEffect(() => {
    setStoryDescription(formik.values.storyDescription);
  }, [formik.values.storyDescription, setStoryDescription]);

  return (
    <>
      <div className="  my-12">
          <ColorlibStepper activeStepper={activeStepper} steps={steps} />
      </div>
      <h2 className="font-semibold mb-4">Story Discription</h2>
      <textarea
        rows={
          formik?.values?.storyDescription === ""
            ? 12
            : formik?.values?.storyDescription?.split("\n")?.length + 12
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
          className="bg-[#5bbcff] disabled:bg-gray-600 disabled:!text-white   text-tiny  sm:text-base"
          onClick={() => setActiveStep(4)}
          disabled={isGenerating}
          sx={{
            fontSize: {
              xs: "0.7rem",
              sm: "0.875rem",
            },
          }}
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
            className="bg-[#5bbcff] disabled:bg-gray-600 disabled:!text-white text-tiny  text-sm sm:text-base"
            onClick={formik?.handleSubmit}
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.875rem",
              },
            }}
          >
            Generate Video Story
          </Button>
        )}
      </div>
    </>
  );
};
