import { useUser } from "@clerk/nextjs";
import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import SubscriptionContext from "../context/SubscriptionContext";
import { isImage, validateImgSize } from "../utils/fileValidation";
import Disclaimer from "./Disclaimer";
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { MdOutlineCloudUpload } from "react-icons/md";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {
  const [promptInput, setPromptInput] = useState("");

  const [negativePrompt, setNegativePrompt] = useState("");

  const [videoLength, setVideoLength] = useState("16");

  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSrc, setVideoSrc] = useState();
  const [videoPrediction, setVideoPrediction] = useState(null);

  const [videoPublicId, setVideoPublicId] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [usage, setUsage] = useState("");
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);
  const [imageError, setImageError] = useState();

  const [isGenerating, setIsGenerating] = useState(false);

  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);

  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState("");
  const [image, setImage] = useState(null);
  const [canShowImage, setCanShowImage] = useState(false);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [fps, setFps] = useState(6);
  const [motion, setMotion] = useState(80);
  const [seed, setSeed] = useState("");
  const [numInferenceSteps, setNumInferenceSteps] = useState(9);
  const [aspectRatio, setAspectRatio] = useState("");

  //get the  3 days lag date from current date

  const { isSignedIn, user } = useUser();

  const showLoadingState = loading || (image && !canShowImage);

  // updated code subscription check
  const [count, setCount] = useState(0);

  const { subscriptionData, decreaseStoryBoardAndImage2VideoCount } =
    useContext(SubscriptionContext);

  console.log("here is sub data", subscriptionData);

  useEffect(() => {
    setCount(subscriptionData?.metadata?.storyBoardCount);
    // fetchUserUsage();
  }, [subscriptionData?.metadata?.storyBoardCount]);

  const handleImageChange = (e) => {
    setImageError("");
    const img = e.target.files[0];
    // if no image selected
    if (!img) {
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      const error = "File type should be a jpg/jpeg image";
      toast(error, { type: "error" });
      setImageError(error);
      return;
    }
    const isImageLarge = validateImgSize(img);
    if (isImageLarge) {
      const error = "File must be less or equal to 1MB";
      toast(error, { type: "error" });
      setImageError(error);
      return;
    }
    const reader = new FileReader();
    // converts to BASE 64
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
      setImage(img);
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (subscriptionData?.metadata?.storyBoardCount == "0") {
      window.alert("No attempt left , Please purchase a plan");
      return;
    }

    const form = event.currentTarget;

    const image_fileInput = Array.from(form.elements).find(
      ({ name }) => name === "image"
    );

    const image_formData = new FormData();

    for (const file of image_fileInput.files) {
      image_formData.append("file", file);
    }

    image_formData.append("upload_preset", "app_users");

    const image_data = await fetch(
      "https://api.cloudinary.com/v1_1/dvdxxna6v/image/upload",
      {
        method: "POST",
        body: image_formData,
      }
    ).then((r) => r.json());

    const image_url = image_data.secure_url;

    //useEffect(()=>{
    //  const ele = document.querySelector('.buble');
    //if (ele) {
    //  ele.style.left = `${Number(value / 4)}px`;
    // }
    //})

    // post request to i2v_prediction api for image to video
    var video_body = {
      image_in: image_url,
      seed: 42,
      aspect_ratio: aspectRatio,
      motion: motion,
      fps: 6,
      num_inference_steps: numInferenceSteps,
    };

    const video_response = await fetch("/api/i2v_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video_body),
    });

    let videoPrediction = await video_response.json();
    if (video_response.status !== 201) {
      setError(videoPrediction.detail);

      return;
    }

    setVideoPrediction(videoPrediction);
    while (
      videoPrediction.status !== "succeeded" &&
      videoPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const video_response = await fetch(
        "/api/i2v_predictions/" + videoPrediction.id
      );
      videoPrediction = await video_response.json();
      if (video_response.status !== 200) {
        setError(videoPrediction.detail);
        setVideoPrediction(videoPrediction);
        return;
      }
      console.log({ videoPrediction });
      setVideoPrediction(videoPrediction);
    }

    if (videoPrediction.status == "succeeded") {
      setVideoPrediction(videoPrediction);
      setVideoSrc(videoPrediction.output);
      const updatedCount = await decreaseStoryBoardAndImage2VideoCount(
        user?.primaryEmailAddress?.emailAddress
      );
      setCount(updatedCount?.metadata?.storyBoardCount);
    }
    setImage("");
  };
  console.log({ videoPrediction });

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className=""></div>
      </div>

      <form onSubmit={(e) => handleOnSubmit(e)}>
        <h2 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">
          Available generation : {count || 0}
        </h2>
        <h2
          className="px-2 py-1 text-md text-white font-semibold mb-4"
          htmlFor="image"
        >
          Select Image {"   "}
          {"    "}
          <span className="text-sm text-red-500">(jpg/jpeg) </span>
          <span className="text-sm text-red-400">*</span>
        </h2>

        <div className=" relative h-64  w-full border-2 border-dashed border-gray-400 rounded-md bg-transparent p-5 cursor-pointer">
          <input
            type="file"
            className=" flex rounded-md bg-transparent border opacity-0 border-gray-400 shadow-sm  sm:text-sm px-4 py-2 placeholder-white-500 text-white-900 absolute inset-0 w-full h-full"
            name="image"
            placeholder="Select Picture"
            onChange={handleImageChange}
          />
          <div className="flex flex-col items-center gap-3 justify-center h-full w-full">
            <MdOutlineCloudUpload className="text-5xl" />
            <p className="text-base">Upload Image</p>
            <img src={imageSrc} accept="image/*" />
          </div>
        </div>

        <FormControl
          sx={{ m: 1, minWidth: 150, bgcolor: "#5BBCFF", borderRadius: 1 }}
        >
          <InputLabel id="demo-simple-select-required-label">
            Aspect Ratio
          </InputLabel>
          <Select
            name="aspectRatio"
            label="Aspect Ratio"
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <MenuItem value="16:9">
              <em>16:9</em>
            </MenuItem>
            <MenuItem value="9:16">9:16</MenuItem>
          </Select>
        </FormControl>

        <Container className="mx-3 py-2" maxwidth="lg">
          <Box sx={{ bgcolor: "#fffcf2", height: "flex", borderRadius: 1 }}>
            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                Motion (Required)
              </label>
              <Slider
                defaultValue={80}
                valueLabelDisplay="on"
                color="primary"
                step={10}
                marks
                min={10}
                max={100}
                onChange={(e) => setMotion(e.target.value)}
                name="motion"
              />
            </div>

            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                Num Inference Steps (Required)
              </label>
              <Slider
                defaultValue={9}
                valueLabelDisplay="on"
                color="primary"
                step={1}
                marks
                min={5}
                max={15}
                onChange={(e) => setNumInferenceSteps(e.target.value)}
                name="numInferenceSteps"
              />
            </div>
          </Box>
        </Container>

        {count == 0 ? (
          <Link href="/pricing">
            <button className="hero-button text-white font-bold py-2 px-4 rounded">
              Buy a Plan
            </button>
          </Link>
        ) : (
          <button
            className={`hero-button w-full text-white font-bold py-2 px-4 rounded`}
            type="submit"
            disabled={isGenerating || image === ""}
          >
            {isGenerating ? "Generating..." : "Generate Video"}
          </button>
        )}
      </form>

      <div className="relative flex w-full items-center justify-center py-10">
        {videoPrediction?.output && (
          <div>
            <video
              controls
              muted
              autoPlay
              //src={prediction.output[prediction.output.length - 1]}
              src={videoSrc}
              alt="output"
            />
          </div>
        )}
      </div>

      <p className="py-3 text-sm opacity-50 text-white">
        video status: {videoPrediction?.status}
      </p>

      <Disclaimer />
    </div>
  );
}
