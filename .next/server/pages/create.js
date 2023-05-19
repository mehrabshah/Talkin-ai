"use strict";
(() => {
var exports = {};
exports.id = 2417;
exports.ids = [2417];
exports.modules = {

/***/ 2625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./utils/fileValidation.js
var fileValidation = __webpack_require__(6554);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(5678);
// EXTERNAL MODULE: ./components/SocialLinkBar/index.jsx
var SocialLinkBar = __webpack_require__(9662);
// EXTERNAL MODULE: external "react-faq-component"
var external_react_faq_component_ = __webpack_require__(4660);
var external_react_faq_component_default = /*#__PURE__*/__webpack_require__.n(external_react_faq_component_);
;// CONCATENATED MODULE: ./components/AvatarFAQ/index.jsx



const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "How to make a talking avatar?",
            content: `Upload your character image, type in the text or use GPT2Speech module to create what you want your avatar to say, then either select voice or upload custom voice to clone, click on "Generate Talking Avatar" button.`
        },
        {
            title: "Any avatar image requirements?",
            content: `The avatar image file should be a jpg/jpeg file. Make sure the head is almost in the middle (check existing examples on the website for a reference).`
        },
        {
            title: "Any custom audio requirements?",
            content: `The custom audio file should be a wav/mp3 file, optimally 10-15 seconds.`
        },
        {
            title: "How long does it take to make the video?",
            content: `It depends. It might in seconds or couple of minutes If you come in non-peak hour, you may have to wait cold-start of the machine. If that's the case, grab your coffee and wait couple of minutes. It's worthwhile your wait.`
        },
        {
            title: "How to change the size  of talking avatar video?",
            content: `The default size is 256×256. But you can easily resize by specify the width and height in the url. 
            For example, the original link is https://res.cloudinary.com/*/video/upload/*. Yon can add h_512,w_512 in the link
            as  https://res.cloudinary.com/*/video/upload/h_512,w_512/*.`
        },
        {
            title: "How to share to social media?",
            content: "You can either download the video or use the video url to share."
        },
        {
            title: "How long will the video url be valid?",
            content: `The video url will be valid for 30 days. We still strongly recommend you to download the video and save to your local drive immediately after the creation. `
        },
        {
            title: "How to contact us with further questions?",
            content: `You may go to Chat page and leave us a review. Please be as specific as possible. `
        }
    ]
};
const styles = {
    bgColor: "black",
    titleTextColor: "white",
    rowTitleColor: "white",
    rowContentColor: "grey",
    arrowColor: "white"
};
const config = {
};
function AvatarFAQ() {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "faq-card",
        children: /*#__PURE__*/ jsx_runtime_.jsx((external_react_faq_component_default()), {
            data: data,
            styles: styles,
            config: config
        })
    });
}

// EXTERNAL MODULE: ./components/DiscordButton.jsx
var DiscordButton = __webpack_require__(1001);
;// CONCATENATED MODULE: ./components/AvatarDashboard.js






//import FAQ from './FAQ';




const sleep = (ms)=>new Promise((r)=>setTimeout(r, ms));
function Dashboard() {
    const [events, setEvents] = (0,external_react_.useState)([]);
    const [prediction, setPrediction] = (0,external_react_.useState)(null);
    const [audioPrediction, setAudioPrediction] = (0,external_react_.useState)(null);
    const [error, setError] = (0,external_react_.useState)(null);
    const [imageSrc, setImageSrc] = (0,external_react_.useState)();
    const [audioSrc, setAudioSrc] = (0,external_react_.useState)();
    const [customAudioUrl, setCustomAudioUrl] = (0,external_react_.useState)(null);
    const [uploadData, setUploadData] = (0,external_react_.useState)();
    const [image, setImage] = (0,external_react_.useState)();
    const [audio, setAudio] = (0,external_react_.useState)();
    const [imageError, setImageError] = (0,external_react_.useState)();
    const [audioError, setAudioError] = (0,external_react_.useState)();
    const [videoUrl, setVideoUrl] = (0,external_react_.useState)("");
    const [usage, setUsage] = (0,external_react_.useState)("");
    const [videoScription, setVideoScription] = (0,external_react_.useState)("");
    const [audioFile, setAudioFile] = (0,external_react_.useState)();
    const [role, setRole] = (0,external_react_.useState)("");
    const [topic, setTopic] = (0,external_react_.useState)("");
    const [speech, setSpeech] = (0,external_react_.useState)("");
    const [tone, setTone] = (0,external_react_.useState)("");
    const [numWords, setNumWords] = (0,external_react_.useState)("");
    const [voice, setVoice] = (0,external_react_.useState)("");
    const [isOverUsageLimit, setIsOverUsageLimit] = (0,external_react_.useState)(true);
    const [isCustomAudio, setIsCustomAudio] = (0,external_react_.useState)(false);
    const [isGenerating, setIsGenerating] = (0,external_react_.useState)(false);
    const [isConverted, setIsConverted] = (0,external_react_.useState)(false);
    const session = (0,react_.useSession)();
    const { status , data  } = session;
    const fetchUserUsage = async ()=>{
        const user = await fetch(`/api/fetch-user-profile?email=${data?.user?.email}`);
        const res_user = await user.json();
        var date = new Date();
        date.setDate(date.getDate() - 3);
        // check whether subscribed and the usage is not over plan limit
        if (res_user?.isSubscribed) {
            const response = await fetch(`/api/fetch-user-usage?email=${res_user?.email}&currentPeriodStart=${res_user?.currentPeriodStart}`);
            const result = await response.json();
            //setUsage(response.usage);
            console.log(result?._sum.video_duration);
            setUsage(result?._sum.video_duration);
            if (result?._sum.video_duration == null) {
                setIsOverUsageLimit(false);
            } else {
                switch(res_user?.productSubscribed){
                    case "price_1Mw6i7Dfv2951nlDALJ1T3TO":
                        if (result?._sum.video_duration < 5 * 60 * 60) {
                            setIsOverUsageLimit(false);
                        }
                        break;
                    case "price_1Mw6lvDfv2951nlDJdONFBJ1":
                        if (result?._sum.video_duration < 15 * 60 * 60) {
                            setIsOverUsageLimit(false);
                        }
                        break;
                    case "price_1N8R7vDfv2951nlD2mhgqAuo":
                        if (result?._sum.video_duration < 45 * 60 * 60) {
                            setIsOverUsageLimit(false);
                        }
                        break;
                }
            }
        } else if (res_user?.onTrial && new Date(res_user?.trialStartAt) > date) {
            if (res_user?.creations?.length == 0) {
                setIsOverUsageLimit(false);
            } else {
                const response1 = await fetch(`/api/fetch-trial-usage?email=${res_user?.email}&trialStartAt=${res_user?.trialStartAt}`);
                const result1 = await response1.json();
                if (result1?._sum.video_duration < 3 * 60 * 60) {
                    setIsOverUsageLimit(false);
                }
            }
        }
    };
    (0,external_react_.useEffect)(()=>{
        fetchUserUsage();
    });
    const handleImageChange = (e)=>{
        setImageError("");
        const img = e.target.files[0];
        // if no image selected
        if (!img) {
            return;
        }
        // check if image
        const result = (0,fileValidation/* isImage */.Or)(img.name);
        if (!result) {
            const error = "File type should be a jpg/jpeg image";
            (0,react_toastify_esm/* toast */.Am)(error, {
                type: "error"
            });
            setImageError(error);
            return;
        }
        const isImageLarge = (0,fileValidation/* validateImgSize */.L8)(img);
        if (isImageLarge) {
            const error1 = "File must be less or equal to 1MB";
            (0,react_toastify_esm/* toast */.Am)(error1, {
                type: "error"
            });
            setImageError(error1);
            return;
        }
        const reader = new FileReader();
        // converts to BASE 64
        reader.readAsDataURL(img);
        reader.addEventListener("load", ()=>{
            setImageSrc(reader.result);
            setImage(img);
        });
    };
    const handleAudioChange = async (e)=>{
        setAudioError("");
        const audio = e.target.files[0];
        // if no audio selected
        if (!audio) {
            return;
        }
        // check if audio
        const result = (0,fileValidation/* isAudio */.F0)(audio.name);
        if (!result) {
            const error = "File type should be a audio file";
            (0,react_toastify_esm/* toast */.Am)(error, {
                type: "error"
            });
            setAudioError(error);
            return;
        }
        const isAudioLarge = (0,fileValidation/* validateAudioSize */.jU)(audio);
        if (isAudioLarge) {
            const error1 = "File must be less or equal to 2MB";
            (0,react_toastify_esm/* toast */.Am)(error1, {
                type: "error"
            });
            setAudioError(error1);
            return;
        }
        const reader = new FileReader();
        // converts to BASE 64
        reader.readAsDataURL(audio);
        reader.addEventListener("load", ()=>{
            //setCustomAudioSrc(reader.result);
            setIsCustomAudio(true);
            setAudio(audio);
            console.log(isCustomAudio);
        });
    };
    //handle form submit to create avatar and create record in the database
    const handleOnSubmit = async (event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        const image_fileInput = Array.from(form.elements).find(({ name  })=>name === "image");
        const image_formData = new FormData();
        for (const file of image_fileInput.files){
            image_formData.append("file", file);
        }
        image_formData.append("upload_preset", "app_users");
        const image_data = await fetch("https://api.cloudinary.com/v1_1/dbospsdwo/image/upload", {
            method: "POST",
            body: image_formData
        }).then((r)=>r.json());
        const image_url = image_data.secure_url;
        const audio_fileInput = Array.from(form.elements).find(({ name  })=>name === "audio");
        const audio_formData = new FormData();
        for (const file1 of audio_fileInput.files){
            audio_formData.append("file", file1);
        }
        audio_formData.append("upload_preset", "app_users");
        const audio_data = await fetch("https://api.cloudinary.com/v1_1/dbospsdwo/video/upload", {
            method: "POST",
            body: audio_formData
        }).then((r)=>r.json());
        const customAudioUrl = audio_data.secure_url;
        setCustomAudioUrl(audio_data.secure_url);
        // post request to prediction api to create talking avatar
        if (isCustomAudio) {
            var audio_body = {
                Text: speech,
                //voice_a: voice,
                custom_voice: customAudioUrl
            };
        } else {
            var audio_body = {
                Text: speech,
                voice_a: voice
            };
        }
        const audio_response = await fetch("/api/tts_predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(audio_body)
        });
        let audioPrediction = await audio_response.json();
        if (audio_response.status !== 201) {
            setError(audioPrediction.detail);
            setAudioPrediction(audioPrediction);
            return;
        }
        setAudioPrediction(audioPrediction);
        while(audioPrediction.status !== "succeeded" && audioPrediction.status !== "failed"){
            await sleep(1000);
            const audio_response1 = await fetch("/api/tts_predictions/" + audioPrediction.id);
            audioPrediction = await audio_response1.json();
            if (audio_response1.status !== 200) {
                setError(audioPrediction.detail);
                return;
            }
            console.log({
                audioPrediction
            });
            setAudioPrediction(audioPrediction);
        }
        if (audioPrediction.status == "succeeded") {
            setAudioPrediction(audioPrediction);
            setAudioSrc(audioPrediction.output);
        }
        const audio_url = audioPrediction?.output;
        //setImageSrc(data.secure_url);
        // post request to prediction api to create talking avatar
        const body = {
            image_in: image_url,
            audio_in: audio_url
        };
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);
        while(prediction.status !== "succeeded" && prediction.status !== "failed"){
            await sleep(1000);
            const response1 = await fetch("/api/predictions/" + prediction.id);
            prediction = await response1.json();
            if (response1.status !== 200) {
                setError(prediction.detail);
                return;
            }
            console.log({
                prediction
            });
            setPrediction(prediction);
        }
        // post request to creation api to create creation record in the database
        if (prediction.status == "succeeded") {
            const video_url = prediction.output;
            try {
                // upload to cloudinary
                const video_formData = new FormData();
                video_formData.append("file", video_url);
                video_formData.append("upload_preset", "talking_avatar");
                const video_data = await fetch("https://api.cloudinary.com/v1_1/dbospsdwo/video/upload", {
                    method: "POST",
                    body: video_formData
                }).then((r)=>r.json());
                const cld_video_url = video_data.secure_url;
                const cld_video_id = video_data.public_id;
                const cld_video_duration = Math.floor(video_data.duration * 60);
                setVideoUrl(video_data.secure_url);
                try {
                    //update the database
                    const prisma_body = {
                        cld_video_url,
                        cld_video_id,
                        cld_video_duration
                    };
                    await fetch("/api/creation", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(prisma_body)
                    });
                //await Router.push('/drafts');
                } catch (error) {
                    console.error(error);
                }
            } catch (error1) {
                console.error(error1);
            }
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "grid gap-y-12 md:grid-cols-1 md:gap-x-12 ",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                            onSubmit: (e)=>handleOnSubmit(e),
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                            className: "text-white",
                                            htmlFor: "image",
                                            children: [
                                                "Select Picture: ",
                                                "   ",
                                                "    ",
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-red-500",
                                                    children: "(jpg/jpeg, Max 1MB) "
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-red-400",
                                                    children: "*"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "file",
                                            className: "hero-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900",
                                            name: "image",
                                            placeholder: "Select Picture",
                                            onChange: handleImageChange
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                            src: imageSrc,
                                            className: "basis-1/2 h-auto w-48 my-5",
                                            accept: "image/*"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            htmlFor: "speech",
                                            className: "sr-only",
                                            children: "Speech (Required)"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                            rows: 7,
                                            value: speech,
                                            onChange: (e)=>setSpeech(e.target.value),
                                            name: "speech",
                                            id: "speech",
                                            placeholder: "Speech for AI (Required)",
                                            className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            className: "text-white",
                                            htmlFor: "voice",
                                            children: "Option 1: Select voice"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: voice,
                                            onChange: (e)=>setVoice(e.target.value),
                                            className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                            name: "voice",
                                            id: "voice",
                                            type: "text",
                                            placeholder: "Select Voice",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Select Voice"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-US-Male-A",
                                                    children: "en-US-Male-A"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-US-Female-B",
                                                    children: "en-US-Female-B"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-US-Male-C",
                                                    children: "en-US-Male-C"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-US-Female-D",
                                                    children: "en-US-Female-D"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-GB-Male-E",
                                                    children: "en-GB-Male-E"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-GB-Female-F",
                                                    children: "en-GB-Female-F"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-AU-Male-G",
                                                    children: "en-AU-Male-G"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "en-AU-Female-H",
                                                    children: "en-AU-Female-H"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Cage",
                                                    children: "Cage"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Fifth_Element",
                                                    children: "Fifth_Element"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Musk",
                                                    children: "Musk"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Obama",
                                                    children: "Obama"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Queen",
                                                    children: "Queen"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Shrek",
                                                    children: "Shrek"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Samuel_Jackson",
                                                    children: "Samuel_Jackson"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Tom",
                                                    children: "Tom"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Trump",
                                                    children: "Trump"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Young_Kid",
                                                    children: "Young Kid"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                            className: "text-white",
                                            htmlFor: "audio",
                                            children: [
                                                "Option 2: Upload custom voice ",
                                                "   ",
                                                "    ",
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-red-500",
                                                    children: "(wav/mp3, Max 2MB)"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-red-400",
                                                    children: "*"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            type: "file",
                                            className: "hero-button w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900",
                                            name: "audio",
                                            placeholder: "Upload custom voice file",
                                            onChange: handleAudioChange
                                        })
                                    ]
                                }),
                                isOverUsageLimit ? /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/pricing",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: "hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
                                        children: "Buy a Plan"
                                    })
                                }) : /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    className: `hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || audioPrediction === "" ? "cursor-not-allowed opacity-50" : ""}`,
                                    type: "submit",
                                    disabled: isGenerating || audioPrediction === "",
                                    children: isGenerating ? "Generating..." : "Generate Talking Avatar"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex flex-col",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                    htmlFor: "output",
                                    className: "sr-only",
                                    children: "Output"
                                }),
                                audioPrediction?.output && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("audio", {
                                        controls: true,
                                        muted: true,
                                        autoPlay: true,
                                        //src={prediction.output[prediction.output.length - 1]}
                                        src: audioSrc,
                                        alt: "output"
                                    })
                                }),
                                prediction?.output && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("video", {
                                        controls: true,
                                        muted: true,
                                        autoPlay: true,
                                        //src={prediction.output[prediction.output.length - 1]}
                                        src: prediction.output,
                                        alt: "output"
                                    })
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "py-3 text-sm opacity-50",
                                    children: [
                                        "audio status: ",
                                        audioPrediction?.status
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "py-3 text-sm opacity-50",
                                    children: [
                                        "video status: ",
                                        prediction?.status
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "py-3 text-sm opacity-50",
                                    children: [
                                        "video url: ",
                                        videoUrl
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(DiscordButton/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(SocialLinkBar/* default */.Z, {
                url: videoUrl
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(AvatarFAQ, {})
        ]
    });
}

;// CONCATENATED MODULE: ./pages/create.js


//import { Roboto } from "@next/font/google";

//import AvatarFAQ from '../components/AvatarFAQ';
//const roboto = Roboto({
//  subsets: ["latin"],
//  weight: ["100", "300", "400", "500", "700", "900"],
//});
function Home() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "AI Talking Avatar Generator"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Generated by create next app"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                className: "p-10 mx-auto max-w-4xl",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "topnav",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                className: "header1 text-2xl md:text-2xl font-bold",
                                children: "Make Your Talking Avatar"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex flex-col items-center justify-center px-4 py-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "mt-3 text-1xl text-white",
                            children: "Create Your Unique Talking Avatar in Seconds"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Dashboard, {})
                ]
            })
        ]
    });
}


/***/ }),

/***/ 8103:
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 8797:
/***/ ((module) => {

module.exports = require("next-share");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 5874:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 4331:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 4660:
/***/ ((module) => {

module.exports = require("react-faq-component");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [9210,676,1664,5678,2171], () => (__webpack_exec__(2625)));
module.exports = __webpack_exports__;

})();