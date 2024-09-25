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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {
  const [promptInput, setPromptInput] = useState("");

  const [negativePrompt, setNegativePrompt] = useState("");

  const [videoLength, setVideoLength] = useState("16");

  const [error, setError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSrc, setVideoSrc] = useState();
  const [videoPrediction, setVideoPrediction] = useState({
    id: "ffd1cx7gysrgp0cj58e976tqr4",
    model: "talkin-ai/i2v_story",
    version: "c298663d763898c1f897f48a8537fe3fc4fa63b59a0cda69ec088acfc3ad68cd",
    input: {
      aspect_ratio: "16:9",
      fps: 10,
      image_in:
        "https://res.cloudinary.com/dvdxxna6v/image/upload/v1727283390/twsdw0fmjq5rtona70wf.jpg",
      motion: 80,
      num_inference_steps: 9,
      seed: 42,
    },
    logs: "converted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n        4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:04<00:32,  4.09s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:07<00:25,  3.63s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:10<00:20,  3.37s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:13<00:16,  3.25s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:16<00:13,  3.26s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:20<00:09,  3.27s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:23<00:06,  3.20s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:26<00:03,  3.21s/it]\n100%|██████████| 9/9 [00:29<00:00,  3.16s/it]\n100%|██████████| 9/9 [00:29<00:00,  3.27s/it]\nConverting (0.00) ...\n",
    output:
      "https://replicate.delivery/pbxt/dgLffrSvO4t36klVT6aNVQTk7Nl87a3kJweZcc7d4VqZgeBOB/w77P5O6qYN6n3jQoEJCFpqRn.mp4",
    data_removed: false,
    error: null,
    status: "succeeded",
    created_at: "2024-09-25T16:56:32.758Z",
    started_at: "2024-09-25T17:01:17.709740596Z",
    completed_at: "2024-09-25T17:02:05.361774462Z",
    urls: {
      cancel:
        "https://api.replicate.com/v1/predictions/ffd1cx7gysrgp0cj58e976tqr4/cancel",
      get: "https://api.replicate.com/v1/predictions/ffd1cx7gysrgp0cj58e976tqr4",
    },
    metrics: {
      predict_time: 47.652033887,
    },
  });

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
      fps: fps,
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
        <h1 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">
          Available generation : {count || 0}
        </h1>
        <div className="flex flex-col ">
          <label className="px-2 py-1 text-sm text-white" htmlFor="image">
            Select Picture: {"   "}
            {"    "}
            <span className="text-sm text-red-500">(jpg/jpeg, Max 1MB) </span>
            <span className="text-sm text-red-400">*</span>
          </label>
          <input
            type="file"
            className="hero-button flex rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900"
            name="image"
            placeholder="Select Picture"
            onChange={handleImageChange}
          />

          <img
            src={imageSrc}
            className="basis-1/2 h-auto w-48 my-5"
            accept="image/*"
          />
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
                color="success"
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
                FPS (Required)
              </label>
              <Slider
                defaultValue={6}
                valueLabelDisplay="on"
                color="success"
                step={1}
                marks
                min={6}
                max={25}
                onChange={(e) => setFps(e.target.value)}
                name="fps"
              />
            </div>

            <div className="flex flex-col">
              <label className="px-2 py-3 text-sm  text-black">
                Num Inference Steps (Required)
              </label>
              <Slider
                defaultValue={9}
                valueLabelDisplay="on"
                color="success"
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
