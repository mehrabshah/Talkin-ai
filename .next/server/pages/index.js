"use strict";
(() => {
var exports = {};
exports.id = 5405;
exports.ids = [5405];
exports.modules = {

/***/ 8525:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./utils/AppContext.js
var AppContext = __webpack_require__(5477);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "cloudinary-react"
const external_cloudinary_react_namespaceObject = require("cloudinary-react");
;// CONCATENATED MODULE: ./components/VideoPlayer.js



const VideoPlayer = ()=>{
    const videoRef = (0,external_react_.useRef)();
    return /*#__PURE__*/ jsx_runtime_.jsx(external_cloudinary_react_namespaceObject.CloudinaryContext, {
        cloud_name: "dbospsdwo",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: /*#__PURE__*/ jsx_runtime_.jsx(external_cloudinary_react_namespaceObject.Video, {
                publicId: "talking_avatar/vh6rcnjxyo3yubfpk5js",
                width: "640",
                height: "360",
                controls: true,
                innerRef: videoRef
            })
        })
    });
};
/* harmony default export */ const components_VideoPlayer = (VideoPlayer);

// EXTERNAL MODULE: external "react-icons/bs"
var bs_ = __webpack_require__(567);
;// CONCATENATED MODULE: ./components/Hero.jsx




// React Icons

const Hero = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "grid grid-cols-1 gap-6 py-10 place-items-center md:py-16 md:grid-cols-2",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "header1 text-center text-4xl font-bold md:text-left md:text-5xl",
                        children: "TALKIN AI"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        className: "text-center my-4 text-3xl text-white font-semibold md:text-left md:text-4xl md:my-4",
                        children: "AI GENERATED YOUTUBE VIDEO & TALKING AVATAR"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-center font-normal text-md text-light-gray my-6 mb-8 md:text-left md:text-xl leading-normal"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/auth/signin",
                        title: "Sign In",
                        className: "hero-button flex justify-center items-center gap-3 w-max m-auto mt-8 py-3 px-6 text-sm text-white font-semibold rounded-full active:scale-95 md:text-md md:m-0",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xl md:text-2xl",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(bs_.BsFillPlayCircleFill, {})
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                children: "Make Your Own"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    classname: "video-card flex justify-center items-center gap-3 m-auto mt-8 py-3 px-6",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(components_VideoPlayer, {})
                })
            })
        ]
    });
};
/* harmony default export */ const components_Hero = (Hero);

;// CONCATENATED MODULE: ./components/EpisodesTypes/data/data.js
const data = [
    {
        id: 1,
        title: "Talking Avatar",
        description: "Make your unique talking avatar with our proprietary AI and voice  clone technology! Upload your character image, type in the text  or use ChatGPT  to create  what you want your avatar to say, pick  a voice for your avatar, and save your avatar and share it on social media or embed it on your website!",
        //video_url: "https://res.cloudinary.com/dbospsdwo/video/upload/v1683231121/talking_avatar/yjcshlipwabjzyrirrmk.mp4"
        video_url: "https://res.cloudinary.com/dbospsdwo/video/upload/v1683577132/talking_avatar/akozokggs8swy5cbnyat.mp4"
    },
    {
        id: 2,
        title: "Youtube Video",
        description: "Make funny youtube video by change the speech of  the video with our voice clone technology.",
        video_url: "https://res.cloudinary.com/dbospsdwo/video/upload/v1683742127/result_voice_iowf0r.mp4"
    },
    {
        id: 3,
        title: "ChatGPT Speech Creation",
        description: "Create professional speech with your any chosen topic and pick any voice you like.",
        video_url: "https://res.cloudinary.com/dbospsdwo/video/upload/v1683909446/talking_avatar/wcrfglpwywjouvscnoq5.mp4"
    }
];
/* harmony default export */ const data_data = (data);

;// CONCATENATED MODULE: ./components/EpisodesTypes/index.jsx


// Episodes Types Data

const EpisodesTypes = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "feature-content bg-light-purple py-2 md:py-16",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "max-w-5xl w-100 m-auto px-4",
            children: data_data.map((episode, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    title: episode.title,
                    className: "episode-card flex flex-col justify-center items-center gap-10 my-6 py-4 px-6 rounded-md md:py-8 md:gap-20 md:px-10 md:flex-row md:justify-between md:my-14",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "h-full w-100 md:w-1/2",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                    className: "text-3xl text-white font-semibold my-4",
                                    children: [
                                        episode.id,
                                        " - ",
                                        episode.title
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "text-sm font-normal text-gray leading-6",
                                    children: episode.description
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "w-100 md:w-1/2",
                            children: /*#__PURE__*/ jsx_runtime_.jsx("video", {
                                controls: true,
                                muted: true,
                                autoPlay: true,
                                src: episode.video_url,
                                className: "w-100",
                                alt: "Episode-Type-Image"
                            })
                        })
                    ]
                }, index))
        })
    });
};
/* harmony default export */ const components_EpisodesTypes = (EpisodesTypes);

;// CONCATENATED MODULE: ./components/Testimonials.tsx

const testimonials = [
    [
        {
            content: "Just had early access to this and it's amazing. The youtube video created is hilarious.",
            //link: "https://twitter.com/rauchg/status/1612233034622984192",
            author: {
                name: "Stephanie Reich",
                role: "CEO at ViMedia"
            }
        },
        {
            content: "There are so many most advanced AI technologies applied here, voice clone, lip-sync, ChatGPT combined together to make amazing products.",
            //link: "https://twitter.com/cramforce/status/1612496954218672128",
            author: {
                name: "Matt Urich",
                role: "CTO at TubeView"
            }
        }
    ],
    [
        {
            content: "I just used it and am extremely impressed with the   functionality and wanted to express my appreciation for the excellent design. Keep up the great work!",
            //link: "https://twitter.com/phar_whaz/status/1612498030627852309",
            author: {
                name: "Adam Leigh",
                role: "Web Designer"
            }
        },
        {
            content: "Turning imagess into a talking avatar with any chosen speaking voice is just damn cool. Works like magic",
            //link: "https://twitter.com/sergvind/status/1612610058369515521",
            author: {
                name: "Sergei Vanderbilt",
                role: "CCO at Tinde"
            }
        }
    ],
    [
        {
            content: "I've just used it and damn I'll keep coming back! This is so good. Great work!",
            //link: "https://twitter.com/Himanil_Gole/status/1612510385504157697",
            author: {
                name: "Helen Cole",
                role: "Designer & Founder at COBRA"
            }
        },
        {
            content: "Wow, thank you! Tried a few and love it! Got lots of likes on my instagram posts!",
            //link: "https://twitter.com/rod_ellison/status/1612513333302775809",
            author: {
                name: "Anne Ellison",
                role: "Youtuber"
            }
        }
    ]
];
function Testimonials() {
    return /*#__PURE__*/ jsx_runtime_.jsx("section", {
        id: "testimonials",
        "aria-label": "What our customers are saying",
        className: "py-10",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "mx-auto md:text-center",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                            className: "mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl",
                            children: "Loved by many worldwide."
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-7",
                            children: "See what our 100,000+ users are saying about the product."
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                    role: "list",
                    className: "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-16 lg:max-w-none lg:grid-cols-3",
                    children: testimonials.map((column, columnIndex)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                role: "list",
                                className: "flex flex-col gap-y-6 sm:gap-y-8",
                                children: column.map((testimonial, testimonialIndex)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        className: "hover:scale-105 transition duration-300 ease-in-out",
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("figure", {
                                            className: "testimonial-card relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("blockquote", {
                                                    className: "relative",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: "text-lg tracking-tight text-slate-900",
                                                        children: testimonial.content
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("figcaption", {
                                                    className: "relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6",
                                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "font-display text-base text-slate-900",
                                                                children: testimonial.author.name
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                className: "mt-1 text-sm text-slate-500",
                                                                children: testimonial.author.role
                                                            })
                                                        ]
                                                    })
                                                })
                                            ]
                                        })
                                    }, testimonialIndex))
                            })
                        }, columnIndex))
                })
            ]
        })
    });
}

;// CONCATENATED MODULE: ./pages/index.js









function Home() {
    const { theme , setTheme , searchValue , setSearchValue  } = (0,external_react_.useContext)(AppContext/* default */.Z);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Talking Avatar Homepage"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "A simple Next.js application that utilizes Replicate to restore old photos."
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "max-w-7xl w-100 m-auto px-4",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Hero, {})
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_EpisodesTypes, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(Testimonials, {})
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

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

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

/***/ 4486:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-loader");

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

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

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

/***/ 567:
/***/ ((module) => {

module.exports = require("react-icons/bs");

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
var __webpack_exports__ = __webpack_require__.X(0, [9210,676,1664,3121,5675], () => (__webpack_exec__(8525)));
module.exports = __webpack_exports__;

})();