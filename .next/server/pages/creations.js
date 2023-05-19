"use strict";
(() => {
var exports = {};
exports.id = 554;
exports.ids = [554];
exports.modules = {

/***/ 5197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function ErrorComponent() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "h-screen flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-4xl text-gray-300",
                children: "Ooops"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-red-300",
                children: "We could not find your profile. Something went wrong!"
            })
        ]
    });
}


/***/ }),

/***/ 488:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lib_prisma)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./lib/prisma.js

//declare global {
//    var prisma: PrismaClient | undefined;
//}
const prisma = global.prisma || new client_namespaceObject.PrismaClient();
if (false) {}
/* harmony default export */ const lib_prisma = (prisma);


/***/ }),

/***/ 7757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "next-auth/jwt"
var jwt_ = __webpack_require__(614);
// EXTERNAL MODULE: ./lib/prisma.js + 1 modules
var prisma = __webpack_require__(488);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
// EXTERNAL MODULE: ./components/ErrorComponent.js
var ErrorComponent = __webpack_require__(5197);
;// CONCATENATED MODULE: ./components/SkeletonLoader.js


function SkeletonLoader() {
    const load = [
        1,
        2,
        3,
        4
    ];
    return /*#__PURE__*/ _jsx("div", {
        className: "flex flex-col justify-evenly items-center h-screen",
        children: load.map((each)=>/*#__PURE__*/ _jsx("div", {
                className: " border-blue-300 shadow rounded-md p-4 w-full",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "animate-pulse flex space-x-4",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "rounded-full bg-slate-700 h-10 w-10"
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "flex-1 space-y-6 py-1",
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    className: "h-2 bg-slate-700 rounded"
                                }),
                                /*#__PURE__*/ _jsxs("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: "grid grid-cols-3 gap-4",
                                            children: [
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "h-2 bg-slate-700 rounded col-span-2"
                                                }),
                                                /*#__PURE__*/ _jsx("div", {
                                                    className: "h-2 bg-slate-700 rounded col-span-1"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx("div", {
                                            className: "h-2 bg-slate-700 rounded"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }, each))
    });
}

;// CONCATENATED MODULE: ./components/Creation.js




function Creation() {
    const [creations, setCreations] = (0,external_react_.useState)();
    const session = (0,react_.useSession)();
    const { status , data  } = session;
    const fetchUserCreation = async ()=>{
        const creation_data = await fetch(`/api/fetch-user-creation-period?email=${res_user?.email}&currentPeriodStart=${res_user?.currentPeriodStart}`);
        //const creation_data = await response.json();
        const creations = creation_data.map((creation)=>({
                ...creation,
                createdAt: Math.floor((new Date() - creation.createdAt) / 1000)
            }));
        setCreations(creations);
    };
    (0,external_react_.useEffect)(()=>{
        fetchUserCreation();
    });
    //const [videoSrc, setVideoSrc] = useState();
    //console.log(creation);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            creations.map((creation)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "container max-w-2xl mx-auto p-5",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("video", {
                                controls: true,
                                muted: true,
                                autoPlay: true,
                                width: 512,
                                height: 512,
                                src: video_url,
                                alt: "output"
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                            className: "py-3 text-sm opacity-50",
                            children: [
                                "video_duration: ",
                                video_duration
                            ]
                        })
                    ]
                }, creation.id)),
            ";"
        ]
    });
}

;// CONCATENATED MODULE: external "mdb-react-ui-kit"
const external_mdb_react_ui_kit_namespaceObject = require("mdb-react-ui-kit");
// EXTERNAL MODULE: external "next-share"
var external_next_share_ = __webpack_require__(8797);
;// CONCATENATED MODULE: ./pages/creations.js


















const getServerSideProps = async ({ req  })=>{
    const token = await (0,jwt_.getToken)({
        req
    });
    if (!token) {
        return {
            props: {
                error: "You are not signed in",
                data: null
            }
        };
    }
    try {
        const data = await prisma/* default.creation.findMany */.Z.creation.findMany({
            where: {
                video_url: {
                    not: null
                },
                user: {
                    id: token.user.id
                }
            }
        });
        //convert decimal value to string to pass through as json
        const creations = data.map((creation)=>({
                ...creation,
                createdAt: Math.floor((new Date() - creation.createdAt) / 1000)
            }));
        return {
            props: {
                error: null,
                creations
            }
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
                data: null
            }
        };
    }
};
function Home({ error , creations  }) {
    if (error) {
        return /*#__PURE__*/ jsx_runtime_.jsx(ErrorComponent/* default */.Z, {});
    }
    const name = "My Talking Avatar";
    const companyName = "TALKIN AI";
    const CreationUrl = creations.length > 0 ? creations[creations.length - 1].video_url : null;
    const companyUrl = "https://www.talkin-ai.com";
    const videoId = creations.length > 0 ? creations[creations.length - 1].video_id : null;
    const logoId = "TALKIN_AI_logo_2_dbcqjk";
    const audioId = "youtube_audio_ppvxml";
    const color = "black";
    const title = `${decodeURIComponent(name)}`;
    const description = ` ${name} created at ${companyName}. Grab your free ticket on ${companyUrl}.`;
    /* Twitter Config */ const tweetText = encodeURIComponent("AI-Generated Talking Avatar!\n\n");
    const twitterShareUrl = encodeURIComponent(`${CreationUrl}?name=${name}&shared=true`);
    const twitterShareHref = `https://twitter.com/intent/tweet?url=${twitterShareUrl}&text=${tweetText}`;
    /* LinkedIn Config */ const linkedInShareUrl = `${CreationUrl}?name%3D${name}&shared%3Dtrue`;
    const linkedInShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${linkedInShareUrl}`;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "talking avarter creations"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Your Creations at TALKIN AI"
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
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "text-6xl font-bold mb-4 text-center"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col items-center justify-center px-4 py-2",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                className: "header1 text-4xl md:text-4xl font-bold",
                                children: "Total Number of Creations"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "mt-3 text-2xl",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "text-2xl font-bold text-white",
                                    children: creations.length
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "mb-20 text-xl text-center text-white",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            children: "\uD83D\uDD25 Your Recent Creations \uD83D\uDD25 "
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                        className: "app__social-links",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.TwitterShareButton, {
                                        href: twitterShareHref,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.TwitterIcon, {
                                            size: 40,
                                            round: true
                                        })
                                    }),
                                    " "
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.LinkedinShareButton, {
                                    href: linkedInShareHref,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.LinkedinIcon, {
                                        size: 40,
                                        round: true
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.FacebookShareButton, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.FacebookIcon, {
                                        size: 40,
                                        round: true
                                    })
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.WhatsappShareButton, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.WhatsappIcon, {
                                        size: 40,
                                        round: true
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                children: [
                                    " ",
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.WeiboShareButton, {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.WeiboIcon, {
                                            size: 40,
                                            round: true
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                children: [
                                    " ",
                                    /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.RedditShareButton, {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.RedditIcon, {
                                            size: 40,
                                            round: true
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.PinterestShareButton, {
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_next_share_.PinterestIcon, {
                                        size: 40,
                                        round: true
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "grid md:grid-cols-1 sm:grid-cols-1 grid-cols-1 justify-items-center gap-3",
                        children: creations.map((creation)=>/*#__PURE__*/ jsx_runtime_.jsx(Creation, {
                                creation: creation
                            }, creation.id))
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 614:
/***/ ((module) => {

module.exports = require("next-auth/jwt");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 8797:
/***/ ((module) => {

module.exports = require("next-share");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

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
var __webpack_exports__ = (__webpack_exec__(7757));
module.exports = __webpack_exports__;

})();