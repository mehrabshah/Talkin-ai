"use strict";
exports.id = 2171;
exports.ids = [2171];
exports.modules = {

/***/ 1001:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


// React Icons
const DiscordButton = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "app__discord-logo",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: "/discord-bot.png",
                alt: "app logo"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "header1 text-1xl font-bold",
                children: [
                    " ",
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                        target: "_blank",
                        href: "https://discord.gg/TFPVcDKK9n",
                        rel: "noopener noreferrer",
                        children: [
                            " ",
                            "Share to Community "
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiscordButton);


/***/ }),

/***/ 9662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8797);
/* harmony import */ var next_share__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_share__WEBPACK_IMPORTED_MODULE_3__);



// React Icons







const SocialLinkBar = ({ video_url  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "state-card",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "mb-20 text-xl text-center text-white",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    children: "\uD83D\uDD25 Share Your Creations With the World \uD83D\uDD25 "
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                className: "app__social-links",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.TwitterShareButton, {
                                url: video_url,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.TwitterIcon, {
                                    size: 40,
                                    round: true
                                })
                            }),
                            " "
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.LinkedinShareButton, {
                            url: video_url,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.LinkedinIcon, {
                                size: 40,
                                round: true
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.FacebookShareButton, {
                            url: video_url,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.FacebookIcon, {
                                size: 40,
                                round: true
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.WhatsappShareButton, {
                            url: video_url,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.WhatsappIcon, {
                                size: 40,
                                round: true
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        children: [
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.WeiboShareButton, {
                                url: video_url,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.WeiboIcon, {
                                    size: 40,
                                    round: true
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                        children: [
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.RedditShareButton, {
                                url: video_url,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.RedditIcon, {
                                    size: 40,
                                    round: true
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.PinterestShareButton, {
                            url: video_url,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_share__WEBPACK_IMPORTED_MODULE_3__.PinterestIcon, {
                                size: 40,
                                round: true
                            })
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialLinkBar);


/***/ }),

/***/ 6554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F0": () => (/* binding */ isAudio),
/* harmony export */   "L8": () => (/* binding */ validateImgSize),
/* harmony export */   "Or": () => (/* binding */ isImage),
/* harmony export */   "jU": () => (/* binding */ validateAudioSize)
/* harmony export */ });
const validateImgSize = (file)=>{
    if (!file) return;
    if (file.size > 1000000) {
        return true;
    } else {
        return false;
    }
};
const validateAudioSize = (file)=>{
    if (!file) return;
    if (file.size > 2000000) {
        return true;
    } else {
        return false;
    }
};
const getExtension = (filename)=>{
    var parts = filename.split(".");
    return parts[parts.length - 1];
};
const isAudio = (filename)=>{
    var ext = getExtension(filename);
    switch(ext.toLowerCase()){
        case "wav":
        case "mp3":
            return true;
    }
    return false;
};
const isImage = (filename)=>{
    var ext = getExtension(filename);
    switch(ext.toLowerCase()){
        case "jpg":
        case "jpeg":
            return true;
    }
    return false;
};


/***/ })

};
;