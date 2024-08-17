import Link from 'next/link';
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
import { isImage, isAudio, validateImgSize, validateAudioSize, } from '../utils/fileValidation';
import { useContext, useEffect } from 'react';
//import FAQ from './FAQ';
import Disclaimer from './Disclaimer';
import SocialLinkBar from './SocialLinkBar';
import AvatarFAQ from './AvatarFAQ';
import DiscordButton from './DiscordButton';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { Gate, useSubscription } from "use-stripe-subscription";
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
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
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



    

    
    // post request to prediction api to create talking avatar
    
    var body = {

        num_ids: numIds,
        style_name: style,
        image_width: width,
        image_height: height,
        story_description: story,
        character_description: character,

      };
    




    const story_response = await fetch("/api/story_predictions", {
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
      const story_response = await fetch("/api/story_predictions/" + storyPrediction.id);
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
   
    setImage();
    

  };



  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
        
          
          <form onSubmit={(e) => handleOnSubmit(e)}>

            
          
            <h1 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">Available generation : {count || 0}</h1>
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
                placeholder="Character Description (Required)"
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
              placeholder="Story Description (Required)"
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
      
      <FormControl   sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="demo-simple-select-required-label"  >Width</InputLabel>
        <Select
          name="width"
          label="Width"
          onChange={(e) => setWidth(e.target.value)}
        >
          <MenuItem value={1024}>
            <em>1024</em>
          </MenuItem>
          <MenuItem value={960}>960</MenuItem>
          <MenuItem value={768}>768</MenuItem>
          <MenuItem value={720}>720</MenuItem>
          <MenuItem value={640}>640</MenuItem>
          <MenuItem value={576}>576</MenuItem>
          <MenuItem value={512}>512</MenuItem>
        </Select>
       
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Height</InputLabel>
        <Select
          name="height"
          label="Heigt"
          onChange={(e) => setHeight(e.target.value)}
        >
          <MenuItem value={576}>
            <em>576</em>
          </MenuItem>
          <MenuItem value={1024}>1024</MenuItem>
          <MenuItem value={960}>960</MenuItem>
          <MenuItem value={768}>768</MenuItem>
          <MenuItem value={720}>720</MenuItem>
          <MenuItem value={640}>640</MenuItem>
          <MenuItem value={512}>512</MenuItem>
        </Select>
        
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
                disabled={isGenerating || character === "" || story === ""  || style === "" || width === ""  || height === "" || numIds === ""}
              >
                {isGenerating ? "Generating..." : "Generate Story Board"}
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
              <div >
                <Image 
                  //src={prediction.output[prediction.output.length - 1]}
                  src={storyPrediction.output.individual_images[0]}
                  width={1024}
                  height={576}
                  alt="output"
                />
                <Image 
                  //src={prediction.output[prediction.output.length - 1]}
                  src={storyPrediction.output.individual_images[1]}
                  width={1024}
                  height={576}
                  alt="output"
                />
              </div>
              
            )}
           
          </div>
        </div>
      </div>

      <Disclaimer />
      <DiscordButton />
      <AvatarFAQ />


    </div>


  );
}


