import Link from 'next/link';
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
import { isImage, isAudio, validateImgSize, validateAudioSize, } from '../utils/fileValidation';
import { useContext, useEffect } from 'react';
//import FAQ from './FAQ';
import Disclaimer from './Disclaimer';
import SocialLinkBar from './SocialLinkBar';
import StoryBoardFAQ from './StoryBoardFAQ';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SubscriptionContext from "../context/SubscriptionContext";


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {

  const [age, setAge] = useState('');
  const [events, setEvents] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [storyPrediction, setStoryPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState();
  
  const [image, setImage] = useState();
  
  const [imageError, setImageError] = useState();
  
  const [videoUrl, setVideoUrl] = useState('');
  const [usage, setUsage] = useState('');

  const [character, setCharacter] = useState("");
  const [story, setStory] = useState("");
  const [style, setStyle] = useState("");
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
  const [aspectRatio, setAspectRatio] = useState("");
  const [numIds, setNumIds] = useState("");
  
  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);
  
  const [isRefImage, setIsRefImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);
  const [startDate, setStartDate] =  useState("");
  

  

  const { isSignedIn, user } = useUser();


  // updated code subscription check

  const [count, setCount] = useState(0);

  const {
    subscriptionData,
    decreaseStoryBoardAndImage2VideoCount
  } = useContext(SubscriptionContext);

  console.log('here is sub data', subscriptionData)

  useEffect(() => {
    setCount(subscriptionData?.metadata?.storyBoardCount)
    // fetchUserUsage();

  }, [subscriptionData?.metadata?.storyBoardCount]);
  

  
  const handleImageChange = (e) => {
    setImageError('');
    const img = e.target.files[0];
    // if no image selected
    if (!img) {
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      const error = 'File type should be a jpg/jpeg image';
      toast(error, { type: 'error' });
      setImageError(error);
      return;
    }
    const isImageLarge = validateImgSize(img);
    if (isImageLarge) {
      const error = 'File must be less or equal to 1MB';
      toast(error, { type: 'error' });
      setImageError(error);
      return;
    }
    const reader = new FileReader();
    // converts to BASE 64
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setImage(img);
      setIsRefImage(true);
    });
  };

  
  //handle form submit to create avatar and create record in the database
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (subscriptionData?.metadata?.storyBoardCount == '0') {
      window.alert('No attempt left , Please purchase a plan');
      return;
    }

    const form = event.currentTarget;


    if (isRefImage) {
      
      const image_fileInput = Array.from(form.elements).find(({ name }) => name === 'image');

      const image_formData = new FormData();

      for (const file of image_fileInput.files) {
      image_formData.append('file', file);
       }

      image_formData.append('upload_preset', 'app_users');

      const image_data = await fetch('https://api.cloudinary.com/v1_1/dbospsdwo/image/upload', {
      method: 'POST',
      body: image_formData
      }).then(r => r.json());

      const image_url = image_data.secure_url;


      var body = {
        
        num_ids: numIds,
        ref_image: image_url,
        style_name: style,
        story_description: story,
        character_description: character,
        aspect_ratio: aspectRatio,
        video_width: width,
        video_height: height,
        
      };
    } else {
    

    
    // post request to prediction api to create talking avatar
    
    var body = {

        num_ids: numIds,
        style_name: style,
        story_description: story,
        character_description: character,
        aspect_ratio: aspectRatio,
        video_width: width,
        video_height: height,

      };
    

    }


    const story_response = await fetch("/api/video_story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        body),
    });


    let storyPrediction = await story_response.json();
    if (story_response.status !== 201) {
      setError(storyPrediction.detail);
      setStoryPrediction(storyPrediction);
      return;
    }
    setStoryPrediction(storyPrediction);

    while (
      storyPrediction.status !== "succeeded" &&
      storyPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const story_response = await fetch("/api/video_story/" + storyPrediction.id);
      storyPrediction = await story_response.json();
      if (story_response.status !== 200) {
        setError(storyPrediction.detail);
        return;
      }
      console.log({ storyPrediction });
      setStoryPrediction(storyPrediction);
    }
    if (storyPrediction.status == "succeeded") {
      setStoryPrediction(storyPrediction);
      const updatedCount = await decreaseStoryBoardAndImage2VideoCount(user?.primaryEmailAddress?.emailAddress)
      setCount(updatedCount?.metadata?.storyBoardCount)
    }


    //const story_url = storyPrediction?.output;
    //setImageSrc(data.secure_url);

    // post request to prediction api to create talking avatar
    

    // post request to creation api to create creation record in the database
   
    setImage("");
    

  };



  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
        
          
          <form onSubmit={(e) => handleOnSubmit(e)}>

            
          
            <h1 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">Available generation : {count || 0}</h1>
            
            <div className="flex flex-col ">
            <label className="px-2 py-1 text-sm text-white">
        Use Ref Image: <input type="checkbox" name="isRefImage" defaultChecked={false} color="success" />
      </label>
      </div>
            <div className="flex flex-col ">
              <label className="px-2 py-1 text-sm text-white" htmlFor="image">
                Reference Image (Optional) {"   "}{"    "}
                <span className="text-sm text-red-500">(jpg/jpeg, Max 1MB) </span>
                <span className="text-sm text-red-400">*</span>
              </label>
              <input
                type="file"
                className="upload-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900"
                name="image"
                placeholder="Select Picture"
                onChange={handleImageChange}
              />
              <img src={imageSrc} className="basis-1/2 h-auto w-48 my-5" accept="image/*" />
            </div>
            
            <div className="flex flex-col">
            <label className="text-sm text-white">
            Character Description (Required): {"   "}{"    "}
            </label>
            <TextField
              variant="filled" 
              color="success"
              multiline
              maxRows={5}
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                name="character"
                placeholder="Character Description (Required) (See instruction below)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            

            <div className="flex flex-col">
            <label className="text-sm text-white" htmlFor="story">
            Story Description (Required): {"   "}{"    "}
            </label>
              <TextField
              variant="filled" 
              color="success"
              multiline
              maxRows={15}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              name="story"
              placeholder="Story Description (Required) (See instruction below)"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            
           
            
        

            <Container  className="mx-3 py-2">
        <Box sx={{ bgcolor: '#fffcf2', height: '20vh', borderRadius: 1, }} >
      

            <div>
           

            <FormControl   sx={{ m: 1, minWidth: 200 }} >
        <InputLabel id="demo-simple-select-required-label" >Number of Characters </InputLabel>
        <Select
          name="numIds"
          label="Number of Characters"
          onChange={(e) => setNumIds(e.target.value)}
        >
          <MenuItem value={1}>
            <em>1</em>
          </MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      
        </FormControl>
      
     
     
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-required-label">Image Style</InputLabel>
        <Select
          name="style"
          label="Image Style"
          onChange={(e) => setStyle(e.target.value)}
        >
          <MenuItem value="Japanese Anime">
            <em>Japanese Anime</em>
          </MenuItem>
          <MenuItem value="Digital/Oil Painting">Digital/Oil Painting</MenuItem>
          <MenuItem value="Pixar/Disney Character">Pixar/Disney Character</MenuItem>
          <MenuItem value="Cinematic">Cinematic</MenuItem>
          <MenuItem value="Photographic">Photographic</MenuItem>
          <MenuItem value="Comic book">Comic book</MenuItem>
          <MenuItem value="Line art">Line art</MenuItem>
          <MenuItem value="Black and White Film Noir">Black and White Film Noir</MenuItem>
          <MenuItem value="Isometric Rooms">Isometric Rooms</MenuItem>

        </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-required-label">Aspect Ratio</InputLabel>
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

        <FormControl   sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="demo-simple-select-required-label"  >Width</InputLabel>
        <Select
          name="width"
          label="Width"
          onChange={(e) => setWidth(e.target.value)}
        >
          <MenuItem value={1280}>
            <em>1280</em>
          </MenuItem>
          <MenuItem value={608}>608</MenuItem>
          <MenuItem value={720}>720</MenuItem>
          <MenuItem value={1080}>1080</MenuItem>
          <MenuItem value={1350}>1350</MenuItem>
          <MenuItem value={1920}>1920</MenuItem>
        </Select>
       
      </FormControl>
      
      <FormControl   sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="demo-simple-select-required-label"  >Height</InputLabel>
        <Select
          name="height"
          label="height"
          onChange={(e) => setHeight(e.target.value)}
        >
          <MenuItem value={720}>
            <em>720</em>
          </MenuItem>
          <MenuItem value={608}>608</MenuItem>
          <MenuItem value={1080}>1080</MenuItem>
          <MenuItem value={1280}>1280</MenuItem>
          <MenuItem value={1350}>1350</MenuItem>
          <MenuItem value={1920}>1920</MenuItem>
        </Select>
       
      </FormControl>


    </div>
    </Box>
    </Container>

            {count == 0?
              
               (
                <Link href="/pricing">
                  <button
                    className="hero-button text-white font-bold py-2 px-4 rounded"
                  >Buy a Plan</button>
                </Link>
              ) : (<button
                className={`hero-button w-full text-white font-bold py-2 px-4 rounded`}
                type="submit"
                disabled={isGenerating || character === "" || story === ""  || style === ""  || numIds === "" || aspectRatio === ""}
              >
                {isGenerating ? "Generating..." : "Generate Video Story"}
              </button>) 
            }
          </form>
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>

          
            <p className="py-3 text-sm opacity-50">Generation Status: {storyPrediction?.status}</p>
            

            {storyPrediction?.output && (
              <div>
                <video controls muted autoPlay
                  //src={prediction.output[prediction.output.length - 1]}
                  src={storyPrediction.output.final_video_story}
                  width={width}
                  height={height}
                  alt="output"
                />
                
              
              </div>
           
            )}
            {storyPrediction?.output && (
              storyPrediction.output.individual_videos.map((video_src)=>(
              <div >
                <video controls muted autoPlay
                  //src={prediction.output[prediction.output.length - 1]}
                  src={video_src}
                  width={width}
                  height={height}
                  alt="output"
                />
                
              </div>
            ))
            )}

           
          </div>
        </div>
      </div>

      <Disclaimer />
     
      <StoryBoardFAQ />


    </div>


  );
}

