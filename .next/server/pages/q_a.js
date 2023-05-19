(() => {
var exports = {};
exports.id = 1045;
exports.ids = [1045];
exports.modules = {

/***/ 9285:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "Home_main__nLjiQ",
	"header": "Home_header__GCVRv",
	"topnav": "Home_topnav__BfkuW",
	"navlogo": "Home_navlogo__AhPAx",
	"navlinks": "Home_navlinks__mBPil",
	"apptitle": "Home_apptitle__ajcBb",
	"appdescription": "Home_appdescription__3WT4M",
	"link": "Home_link__mt0ji",
	"cloudform": "Home_cloudform__W4PLJ",
	"textarea": "Home_textarea__lSHf7",
	"generatebutton": "Home_generatebutton__omKYX",
	"loadingwheel": "Home_loadingwheel__IWJnE",
	"svgicon": "Home_svgicon__PLaWz",
	"messagelist": "Home_messagelist__YHr8p",
	"messagelistloading": "Home_messagelistloading__tlCYV",
	"usermessage": "Home_usermessage__tWHWR",
	"usermessagewaiting": "Home_usermessagewaiting__PYv_4",
	"loading-gradient": "Home_loading-gradient__8jpVG",
	"apimessage": "Home_apimessage__VhfTn",
	"fadein": "Home_fadein__CBLON",
	"markdownanswer": "Home_markdownanswer__UUDfu",
	"boticon": "Home_boticon__Xr0Q4",
	"usericon": "Home_usericon___BrVD",
	"center": "Home_center__4BFgC",
	"cloud": "Home_cloud__S7par",
	"pointsnormal": "Home_pointsnormal__yRwA_",
	"pointsdim": "Home_pointsdim__x_zcw",
	"footer": "Home_footer____T7K",
	"fadeIn": "Home_fadeIn__rYUMu"
};


/***/ }),

/***/ 9531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(9285);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/react-markdown/lib/react-markdown.js + 125 modules
var react_markdown = __webpack_require__(2476);
;// CONCATENATED MODULE: external "@mui/material/CircularProgress"
const CircularProgress_namespaceObject = require("@mui/material/CircularProgress");
var CircularProgress_default = /*#__PURE__*/__webpack_require__.n(CircularProgress_namespaceObject);
;// CONCATENATED MODULE: external "@microsoft/fetch-event-source"
const fetch_event_source_namespaceObject = require("@microsoft/fetch-event-source");
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
;// CONCATENATED MODULE: ./components/Review.js
// pages/pricing.js





function Review() {
    const [productName, setProductName] = (0,external_react_.useState)();
    const [planName, setPlanName] = (0,external_react_.useState)();
    const [productReview, setProductReview] = (0,external_react_.useState)();
    const [message, setMessage] = (0,external_react_.useState)("");
    const [isError, setIsError] = (0,external_react_.useState)("");
    const [isGenerating, setIsGenerating] = (0,external_react_.useState)(false);
    const session = (0,react_.useSession)();
    const { status , data  } = session;
    const submitProduct = (event)=>{
        event.preventDefault();
        fetch("/api/add-review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productName,
                planName,
                productReview
            })
        }).then(()=>{
            setIsError(false);
            setMessage("We have received your feedback! Thank you!");
        }).catch((error)=>{
            setIsError(true);
            setMessage("Something is wrong!");
        //console.log(error)
        });
        event.target.reset();
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "background-remover",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Send Us Your Feedback"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Background-remover"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("form", {
                        onSubmit: (event)=>submitProduct(event),
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "review-card shadow sm:rounded-md sm:overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            className: "text-white",
                                            htmlFor: "productName",
                                            children: "Product Name"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: productName,
                                            onChange: (e)=>setProductName(e.target.value),
                                            className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                            name: "productName",
                                            id: "productName",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Select Product"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "TalkingAvatar",
                                                    children: "Talking Avatar"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Tube2Lip",
                                                    children: "Tube2Lip"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "GPT2Speech",
                                                    children: "GPT2Speech"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Other",
                                                    children: "Other"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            className: "text-white",
                                            htmlFor: "planName",
                                            children: "Plan Name"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                            value: planName,
                                            onChange: (e)=>setPlanName(e.target.value),
                                            className: "block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900",
                                            name: "planName",
                                            id: "planName",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "",
                                                    children: "Select Plan"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "New User Trial",
                                                    children: "New User Trial"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Lite Plan",
                                                    children: "Lite Plan"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Pro Plan",
                                                    children: "Pro Plan"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                    value: "Advanced Plan",
                                                    children: "Advanced Plan"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                            htmlFor: "about",
                                            className: "block text-sm font-medium text-white-700",
                                            children: "Review"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "text-black mt-1",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                                id: "productReview",
                                                name: "productReview",
                                                rows: 7,
                                                value: productReview,
                                                onChange: (e)=>setProductReview(e.target.value),
                                                className: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "submit",
                                        className: `hero-button w-full hover:bg-green-700 text-white font-bold mt-6 py-2 px-4 rounded
                  ${isGenerating || planName === "" ? "cursor-not-allowed opacity-50" : ""}`,
                                        disabled: isGenerating || planName === "",
                                        children: isGenerating ? "Generating..." : "Submit Your Review"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "header1 py-3",
                        children: message
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./pages/q_a.tsx










function Home() {
    const [userInput, setUserInput] = (0,external_react_.useState)("");
    const [loading, setLoading] = (0,external_react_.useState)(false);
    const [messageState, setMessageState] = (0,external_react_.useState)({
        messages: [
            {
                "message": "Hi, I'm an AI assistant for TALKIN AI. How can I help you?",
                "type": "apiMessage"
            }
        ],
        history: []
    });
    const { messages , pending , history  } = messageState;
    const messageListRef = (0,external_react_.useRef)(null);
    const textAreaRef = (0,external_react_.useRef)(null);
    // Auto scroll chat to bottom
    (0,external_react_.useEffect)(()=>{
        const messageList = messageListRef.current;
        if (messageList) {
            messageList.scrollTop = messageList.scrollHeight;
        }
    }, [
        pending
    ]);
    // Focus on text field on load
    (0,external_react_.useEffect)(()=>{
        textAreaRef.current?.focus();
    }, [
        loading
    ]);
    // Handle form submission
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const question = userInput.trim();
        if (question === "") {
            return;
        }
        setMessageState((state)=>({
                ...state,
                messages: [
                    ...state.messages,
                    {
                        type: "userMessage",
                        message: question
                    }
                ],
                pending: undefined
            }));
        setLoading(true);
        setUserInput("");
        setMessageState((state)=>({
                ...state,
                pending: ""
            }));
        const ctrl = new AbortController();
        (0,fetch_event_source_namespaceObject.fetchEventSource)("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question,
                history
            }),
            signal: ctrl.signal,
            onmessage: (event)=>{
                if (event.data === "[DONE]") {
                    setMessageState((state)=>({
                            history: [
                                ...state.history,
                                [
                                    question,
                                    state.pending ?? ""
                                ]
                            ],
                            messages: [
                                ...state.messages,
                                {
                                    type: "apiMessage",
                                    message: state.pending ?? ""
                                }
                            ],
                            pending: undefined
                        }));
                    setLoading(false);
                    ctrl.abort();
                } else {
                    const data = JSON.parse(event.data);
                    setMessageState((state)=>({
                            ...state,
                            pending: (state.pending ?? "") + data.data
                        }));
                }
            }
        });
    };
    // Prevent blank submissions and allow for multiline input
    const handleEnter = (e)=>{
        if (e.key === "Enter" && userInput) {
            if (!e.shiftKey && userInput) {
                handleSubmit(e);
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    const chatMessages = (0,external_react_.useMemo)(()=>{
        return [
            ...messages,
            ...pending ? [
                {
                    type: "apiMessage",
                    message: pending
                }
            ] : []
        ];
    }, [
        messages,
        pending
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "TALKIN AI ChatBOT"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "title",
                        content: "Chat Your Data"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Using AI to answer questions"
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
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (Home_module_default()).topnav,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                    className: "header1 text-2xl md:text-2xl font-bold",
                                    children: "TALKIN.AI ChatBOT"
                                })
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                        className: (Home_module_default()).main,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (Home_module_default()).cloud,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    ref: messageListRef,
                                    className: (Home_module_default()).messagelist,
                                    children: chatMessages.map((message, index)=>{
                                        let icon;
                                        let className;
                                        if (message.type === "apiMessage") {
                                            icon = /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                src: "/talkinai_bobo.png",
                                                alt: "AI",
                                                width: "30",
                                                height: "30",
                                                className: (Home_module_default()).boticon,
                                                priority: true
                                            });
                                            className = (Home_module_default()).apimessage;
                                        } else {
                                            icon = /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                src: "/usericon.png",
                                                alt: "Me",
                                                width: "30",
                                                height: "30",
                                                className: (Home_module_default()).usericon,
                                                priority: true
                                            });
                                            // The latest message sent by the user will be animated while waiting for a response
                                            className = loading && index === chatMessages.length - 1 ? (Home_module_default()).usermessagewaiting : (Home_module_default()).usermessage;
                                        }
                                        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: className,
                                            children: [
                                                icon,
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: (Home_module_default()).markdownanswer,
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_markdown/* ReactMarkdown */.D, {
                                                        children: message.message
                                                    })
                                                })
                                            ]
                                        }, index);
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (Home_module_default()).center,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Home_module_default()).cloudform,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                                            onSubmit: handleSubmit,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                                    disabled: loading,
                                                    onKeyDown: handleEnter,
                                                    ref: textAreaRef,
                                                    autoFocus: false,
                                                    rows: 1,
                                                    maxLength: 512,
                                                    id: "userInput",
                                                    name: "userInput",
                                                    placeholder: loading ? "Waiting for response..." : "Type your question...",
                                                    value: userInput,
                                                    onChange: (e)=>setUserInput(e.target.value),
                                                    className: (Home_module_default()).textarea
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                    type: "submit",
                                                    disabled: loading,
                                                    className: (Home_module_default()).generatebutton,
                                                    children: loading ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: (Home_module_default()).loadingwheel,
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx((CircularProgress_default()), {
                                                            color: "inherit",
                                                            size: 20
                                                        })
                                                    }) : // Send icon SVG in input field
                                                    /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                        viewBox: "0 0 20 20",
                                                        className: (Home_module_default()).svgicon,
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                            d: "M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                                        })
                                                    })
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (Home_module_default()).footer,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            children: " "
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: (Home_module_default()).topnav,
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                        href: "/",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                            className: "header1 text-2xl md:text-2xl font-bold",
                                            children: "Write a Review"
                                        })
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Review, {})
                        ]
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 950:
/***/ ((module) => {

"use strict";
module.exports = require("extend");

/***/ }),

/***/ 9270:
/***/ ((module) => {

"use strict";
module.exports = require("inline-style-parser");

/***/ }),

/***/ 3715:
/***/ ((module) => {

"use strict";
module.exports = require("is-buffer");

/***/ }),

/***/ 1649:
/***/ ((module) => {

"use strict";
module.exports = require("next-auth/react");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 5874:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 4331:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 580:
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1017:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 7282:
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ 7310:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [9210,676,1664,3121,5675,2476], () => (__webpack_exec__(9531)));
module.exports = __webpack_exports__;

})();