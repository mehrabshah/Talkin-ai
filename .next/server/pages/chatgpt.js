"use strict";
(() => {
var exports = {};
exports.id = 8647;
exports.ids = [8647];
exports.modules = {

/***/ 6874:
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./components/Dashboard.js





const sleep = (ms)=>new Promise((r)=>setTimeout(r, ms));
function Dashboard() {
    const [videoScription, setVideoScription] = (0,external_react_.useState)("");
    const [audioFile, setAudioFile] = (0,external_react_.useState)();
    const [role, setRole] = (0,external_react_.useState)("");
    const [topic, setTopic] = (0,external_react_.useState)("");
    const [keyWords, setKeyWords] = (0,external_react_.useState)("");
    const [tone, setTone] = (0,external_react_.useState)("");
    const [numWords, setNumWords] = (0,external_react_.useState)("");
    const [voice, setVoice] = (0,external_react_.useState)("");
    const [error, setError] = (0,external_react_.useState)("");
    const [usage, setUsage] = (0,external_react_.useState)("");
    const [isOverUsageLimit, setIsOverUsageLimit] = (0,external_react_.useState)(true);
    const [isCopied, setIsCopied] = (0,external_react_.useState)(false);
    const [isGenerating, setIsGenerating] = (0,external_react_.useState)(false);
    const [isConverted, setIsConverted] = (0,external_react_.useState)(false);
    const [prediction, setPrediction] = (0,external_react_.useState)(null);
    const [audioSrc, setAudioSrc] = (0,external_react_.useState)();
    const handleCopy = ()=>{
        navigator.clipboard.writeText(videoScription);
        setIsCopied(true);
    };
    const session = (0,react_.useSession)();
    const { status , data  } = session;
    var date = new Date();
    date.setDate(date.getDate() - 3);
    const fetchUserUsage = async ()=>{
        const user = await fetch(`/api/fetch-user-profile?email=${data?.user?.email}`);
        const res_user = await user.json();
        // check whether subscribed and the usage is not over plan limit
        if (res_user?.isSubscribed) {
            const response = await fetch(`/api/fetch-user-usage?email=${res_user?.email}&currentPeriodStart=${res_user?.currentPeriodStart}`);
            const result = await response.json();
            //setUsage(response.usage);
            console.log(result?._sum.video_duration);
            setUsage(result?._sum.video_duration);
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
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsGenerating(true);
        const res = await fetch("/api/returnVideoScription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                role,
                topic,
                keyWords,
                tone,
                numWords
            })
        });
        setIsGenerating(false);
        const data = await res.json();
        //setVideoScription(data.videoScription.trim());
        setVideoScription(data.videoScription);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "max-w-7xl w-full h-screen mx-auto px-4 sm:px-6 lg:px-8 py-12",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "grid gap-y-12 md:grid-cols-1 md:gap-x-12 ",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                        onSubmit: (e)=>handleSubmit(e),
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        className: "sr-only",
                                        htmlFor: "role",
                                        children: "Role (Optional)"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: "text",
                                        className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                        name: "role",
                                        placeholder: "Professional speech writer (Optional)",
                                        id: "role",
                                        value: role,
                                        onChange: (e)=>setRole(e.target.value)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "topic",
                                        className: "sr-only",
                                        children: "Topic"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        value: topic,
                                        onChange: (e)=>setTopic(e.target.value),
                                        required: true,
                                        className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                        placeholder: "Topic (Required)",
                                        type: "text",
                                        name: "topic",
                                        id: "topic"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "keywords",
                                        className: "sr-only",
                                        children: "Keywords for AI (Optional)"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                        rows: 7,
                                        value: keyWords,
                                        onChange: (e)=>setKeyWords(e.target.value),
                                        name: "keyWords",
                                        id: "keyWords",
                                        placeholder: "Keywords for AI (Optional)",
                                        className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        className: "sr-only",
                                        htmlFor: "tone",
                                        children: "Tone"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                        value: tone,
                                        onChange: (e)=>setTone(e.target.value),
                                        className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                        name: "tone",
                                        id: "tone",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "default",
                                                children: "Select Tone (Optional)"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "casual",
                                                children: "Casual"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "friendly",
                                                children: "Friendly"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "professional",
                                                children: "Professional"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                value: "formal",
                                                children: "Formal"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        htmlFor: "words",
                                        className: "sr-only",
                                        children: "Words (Optional)"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        value: numWords,
                                        onChange: (e)=>setNumWords(e.target.value),
                                        type: "number",
                                        className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                        placeholder: "Number Of Words - Max 200 (Optional)",
                                        name: "words",
                                        id: "words"
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
                ${isGenerating || topic === "" ? "cursor-not-allowed opacity-50" : ""}`,
                                type: "submit",
                                disabled: isGenerating || topic === "",
                                children: isGenerating ? "Generating..." : "Generate Speech Text"
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
                            /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                rows: videoScription === "" ? 7 : videoScription.split("\n").length + 12,
                                name: "output",
                                value: videoScription,
                                onChange: (e)=>setVideoScription(e.target.value),
                                disabled: videoScription === "",
                                id: "output",
                                placeholder: "AI Generated Video Scription",
                                className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                onClick: handleCopy,
                                className: "hero-button hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
                                type: "submit",
                                disabled: videoScription === "",
                                children: isCopied ? "Copied" : "Copy to Clipboard"
                            })
                        ]
                    })
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./utils/AppContext.js
var AppContext = __webpack_require__(5477);
;// CONCATENATED MODULE: ./pages/chatgpt.js


//import { Roboto } from "@next/font/google";


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
                        children: "AI Video Script Generator"
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
                                children: "ChatGPT Speech Generator"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex flex-col items-center justify-center px-4 py-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "mt-3 text-1xl text-white",
                            children: "Create Professional Speech in Seconds"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Dashboard, {})
                ]
            })
        ]
    });
}


/***/ }),

/***/ 5477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const AppContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppContext);


/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

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
var __webpack_exports__ = __webpack_require__.X(0, [9210,676,1664], () => (__webpack_exec__(6874)));
module.exports = __webpack_exports__;

})();