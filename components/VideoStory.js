import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useMemo, useState } from "react";
//import FAQ from './FAQ';
import "react-toastify/dist/ReactToastify.css";
import SubscriptionContext from "../context/SubscriptionContext";
import Disclaimer from "./Disclaimer";
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Backdrop, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { initialValues } from "../form/schemas/VideoStory";
import {
  characterSchema,
  ideaSchema,
  ratioSchema,
  storySchema,
  styleSchema,
} from "../form/validation/VideoStory";
import {
  generateImageToVideo,
  getGeneratedImageToVideo,
} from "../service/i2v_prediction";
import {
  generateStoryDescription,
  generateVideoStory,
  getGdeneratedVideoStory,
} from "../service/videostory";
import { Character } from "./MultiStepForm/VideoStory/Character";
import { Description } from "./MultiStepForm/VideoStory/Description";
import { ImageOption } from "./MultiStepForm/VideoStory/ImageOption";
import { ImageRatio } from "./MultiStepForm/VideoStory/ImageRatio";
import { StoryIdea } from "./MultiStepForm/VideoStory/StoryIdea";
import { VideoStorySlider } from "./sliders/VideoStorySlider";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const width = 1280;
const height = 720;

export default function Dashboard() {
  const [storyPrediction, setStoryPrediction] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const { isSignedIn, user } = useUser();
  const [activeStep, setActiveStep] = useState(1);
  const [motion, setMotion] = useState(80);
  const [fps, setFps] = useState(6);
  const [numInferenceSteps, setNumInferenceSteps] = useState(9);
  const [image_url, setImageUrl] = useState(
    storyPrediction?.output?.individual_images[0] || ""
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  // updated code subscription check

  const [count, setCount] = useState(0);

  const { subscriptionData, decreaseStoryBoardAndImage2VideoCount } =
    useContext(SubscriptionContext);

  console.log("here is sub data", subscriptionData);
  console.log("here is sub data", subscriptionData);

  useEffect(() => {
    setCount(subscriptionData?.metadata?.storyBoardCount);
    setCount(subscriptionData?.metadata?.storyBoardCount);
    // fetchUserUsage();
  }, [subscriptionData?.metadata?.storyBoardCount]);

  const handleStoryGeneration = async ({ characters, idea, numPanels }) => {
    try {
      setIsGenerating(true);
      const response = await generateStoryDescription({
        body: {
          characters,
          idea,
          numPanels,
        },
      });

      setIsGenerating(false);

      formik.setFieldValue(
        "storyDescription",
        response.storyDescription?.replace(/\n+/g, "\n")
      );
      setActiveStep(5);
    } catch (error) {
      toast.error(error?.message);
      setIsGenerating(false);
    }
  };

  //handle form submit to create avatar and create record in the database
  const onSubmit = async (values) => {
    try {
      const {
        characters,
        numPanels,
        idea,
        storyDescription,
        aspectRatio,
        image_url,
        style_name,
      } = values;
      if (activeStep < 4) {
        setActiveStep((prev) => ++prev);
        return;
      } else if (activeStep === 4) {
        return handleStoryGeneration({ characters, numPanels, idea });
      }

      if (subscriptionData?.metadata?.storyBoardCount == "0") {
        toast.warn("No attempt left , Please purchase a plan");
        setIsVideoGenerating(false);
        return;
      }
      setIsVideoGenerating(true);
      const body = {
        num_ids: 3,
        style_name,
        style_name,
        story_description: storyDescription,
        character_description: characters,
        aspect_ratio: aspectRatio,
        video_width: aspectRatio === "16:9" ? 1280 : 608,
        video_height: aspectRatio === "16:9" ? 720 : 1080,
        ...(image_url?.length && { ref_image: image_url }),
      };

      let storyPrediction = await generateVideoStory({ body });
      let response = storyPrediction?.data;

      if (storyPrediction?.status !== 201) {
        setError(response?.detail);
        setStoryPrediction(response);
        setImageUrl(response?.detail?.output?.individual_images[0]);
        setIsVideoGenerating(false);
        return;
      }
      setStoryPrediction(response);

      while (
        response?.status !== "succeeded" &&
        response?.status !== "failed"
      ) {
        await sleep(1000);

        storyPrediction = await getGdeneratedVideoStory({
          id: response?.id,
        });
        response = storyPrediction?.data;
        if (storyPrediction?.status !== 200) {
          setError(response?.detail);
          setIsVideoGenerating(false);
          return;
        }

        setStoryPrediction(response);
        setImageUrl(response?.output?.individual_images[0]);
      }
      if (response?.status == "succeeded") {
        setStoryPrediction(response);
        formik?.resetForm();
        setActiveStep(1);
        setIsVideoGenerating(false);
        setImageUrl(response?.output?.individual_images[0]);
        const updatedCount = await decreaseStoryBoardAndImage2VideoCount(
          user?.primaryEmailAddress?.emailAddress
        );
        setCount(updatedCount?.metadata?.storyBoardCount);
      }
    } catch (error) {
      toast.error(error?.message);
      setIsVideoGenerating(false);
    }
  };

  // regenerate video
  const handleRegenerateVideo = async () => {
    try {
      setIsGenerating(true);
      setOpenBackDrop(true);
      if (subscriptionData?.metadata?.storyBoardCount == "0") {
        toast.warn("No attempt left , Please purchase a plan");
        setIsGenerating(false);
        setOpenBackDrop(false);

        return;
      }

      // post request to i2v_prediction api for image to video
      const body = {
        image_in: image_url,
        seed: 42,
        aspect_ratio: storyPrediction?.input?.aspect_ratio,
        motion: motion,
        fps: 6,
        num_inference_steps: numInferenceSteps,
      };

      const video_response = await generateImageToVideo({ body });

      let videoPrediction = video_response?.data;
      console.log({ videoPrediction });
      if (video_response.status !== 201) {
        setError(videoPrediction?.detail);
        setIsGenerating(false);
        setOpenBackDrop(false);
        return;
      }

      setStoryPrediction((prev) => {
        let currentStory = { ...prev };
        currentStory?.output?.individual_videos.splice(
          activeSlide,
          1,
          videoPrediction?.output
        );
        currentStory.status = videoPrediction?.status;

        console.log({ currentStory });
        return currentStory;
      });
      while (
        videoPrediction?.status !== "succeeded" &&
        videoPrediction?.status !== "failed"
      ) {
        await sleep(1000);
        const video_response = await getGeneratedImageToVideo({
          id: videoPrediction?.id,
        });
        videoPrediction = video_response?.data;

        if (video_response?.status !== 200) {
          setError(videoPrediction?.detail);

          setIsGenerating(false);
          setOpenBackDrop(false);
          return;
        }

        setStoryPrediction((prev) => {
          let currentStory = { ...prev };
          currentStory?.output?.individual_videos.splice(
            activeSlide,
            1,
            videoPrediction?.output
          );
          currentStory.status = videoPrediction?.status;

          return currentStory;
        });
      }

      if (videoPrediction?.status == "succeeded") {
        setStoryPrediction((prev) => {
          let currentStory = { ...prev };
          currentStory?.output?.individual_videos.splice(
            activeSlide,
            1,
            videoPrediction?.output
          );
          currentStory.status = videoPrediction?.status;
          return currentStory;
        });
        setIsGenerating(false);
        setOpenBackDrop(false);
        const updatedCount = await decreaseStoryBoardAndImage2VideoCount(
          user?.primaryEmailAddress?.emailAddress
        );
        setCount(updatedCount?.metadata?.storyBoardCount);
      }
      setImageUrl("");
    } catch (error) {
      toast.error(error?.message);
      setIsGenerating(false);
      setOpenBackDrop(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 500);
  }, [activeStep]);

  // validation schema

  const validationSchema = useMemo(() => {
    switch (activeStep) {
      case 1:
        return styleSchema;
      case 2:
        return ratioSchema;
      case 3:
        return characterSchema;
      case 4:
        return ideaSchema;
      case 5:
        return storySchema;
      default:
        break;
    }
  }, [activeStep]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  // steps
  const stepMemo = useMemo(() => {
    switch (activeStep) {
      case 1:
        return <ImageOption formik={formik} />;
      case 2:
        return <ImageRatio setActiveStep={setActiveStep} formik={formik} />;
      case 3:
        return <Character setActiveStep={setActiveStep} formik={formik} />;
      case 4:
        return (
          <StoryIdea
            setActiveStep={setActiveStep}
            formik={formik}
            isGenerating={isGenerating}
          />
        );
      case 5:
        return (
          <Description
            setActiveStep={setActiveStep}
            formik={formik}
            isGenerating={isGenerating}
          />
        );

      default:
        break;
    }
  }, [formik, activeStep]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
          <h1 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">
            Available generation : {count || 0}
          </h1>
          <div className="relative">
            {!storyPrediction ||
            storyPrediction?.status === "starting" ||
            storyPrediction?.status === "processing"
              ? stepMemo
              : null}
            {isVideoGenerating ? (
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                  position: "absolute",
                })}
                open={isVideoGenerating}
                onClick={() => setOpenBackDrop(false)}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : null}
          </div>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>

            <p className="py-3 text-sm opacity-50">
              Generation Status: {storyPrediction?.status}
            </p>

            {storyPrediction && storyPrediction?.status == "succeeded" ? (
              <div className="relative">
                {storyPrediction?.output && (
                  <video
                    controls
                    muted
                    autoPlay
                    src={storyPrediction.output.final_video_story}
                    width={width}
                    height={height}
                    alt="output"
                  />
                )}
                <VideoStorySlider
                  gallery={storyPrediction?.output?.individual_videos}
                  galleryImages={storyPrediction?.output?.individual_images}
                  setStoryPrediction={setStoryPrediction}
                  width={width}
                  height={height}
                  setMotion={setMotion}
                  setNumInferenceSteps={setNumInferenceSteps}
                  handleRegenerateVideo={handleRegenerateVideo}
                  setImageUrl={setImageUrl}
                  activeSlide={activeSlide}
                  setActiveSlide={setActiveSlide}
                />
                <Backdrop
                  sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                    position: "absolute",
                  })}
                  open={openBackDrop}
                  onClick={() => setOpenBackDrop(false)}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
