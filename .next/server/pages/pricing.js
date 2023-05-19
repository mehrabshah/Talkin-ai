"use strict";
(() => {
var exports = {};
exports.id = 9939;
exports.ids = [9939];
exports.modules = {

/***/ 3424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Container = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex-1 max-w-4xl w-full h-full mx-auto p-6 flex",
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Container);


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

/***/ 4657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pricing),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./components/Container.js
var Container = __webpack_require__(3424);
// EXTERNAL MODULE: ./lib/prisma.js + 1 modules
var prisma = __webpack_require__(488);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(1649);
;// CONCATENATED MODULE: external "@stripe/stripe-js"
const stripe_js_namespaceObject = require("@stripe/stripe-js");
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 45 modules
var lib_axios = __webpack_require__(3437);
;// CONCATENATED MODULE: ./utils/payment.js


const processPayment = async (productId)=>{
    const stripe = await (0,stripe_js_namespaceObject.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data  } = await lib_axios/* default.get */.Z.get(`/api/payment/charge-card/${productId}`);
    await stripe.redirectToCheckout({
        sessionId: data.id
    });
};
const processSubscription = async (priceId)=>{
    const stripe = await (0,stripe_js_namespaceObject.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data  } = await lib_axios/* default.get */.Z.get(`/api/payment/subscription/${priceId}`);
    console.log(data);
    await stripe.redirectToCheckout({
        sessionId: data.id
    });
};
const loadPortal = async ()=>{
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data  } = await axios.get("/api/payment/portal");
    window.location.href = data.url;
};


// EXTERNAL MODULE: ./node_modules/stripe/esm/stripe.esm.node.js + 110 modules
var stripe_esm_node = __webpack_require__(1594);
;// CONCATENATED MODULE: ./pages/pricing.js
// pages/pricing.js










const PricingPage = ({ plans , trial  })=>{
    // display plans
    const session = (0,react_.useSession)();
    const { status , data  } = session;
    const [priceId, setPriceId] = (0,external_react_.useState)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "talking avarter creations"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        name: "description",
                        content: "Talkin AI Pricing"
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
                                children: "Pricing"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex flex-col items-center justify-center px-4 py-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "mt-3 text-1xl text-white",
                            children: "Choose Your Plan"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Container/* default */.Z, {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex w-full items-center justify-center",
                            children: [
                                plans.map((plan)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "h-80 w-80 mx-2 bg-white text-black-700 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                                className: "text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300",
                                                children: plan.name
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                className: "flex-1 p-8 flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                        className: "text-gray-600 text-1xl",
                                                        children: [
                                                            "$",
                                                            plan.price / 100,
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                className: "text-black-400 text-sm uppercase",
                                                                children: plan.currency
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                        className: "text-xl text-gray-400 ",
                                                        children: [
                                                            plan.interval,
                                                            "ly"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                className: "hero-button py-4 text-white text-center",
                                                onClick: ()=>processSubscription(plan.priceId),
                                                children: "Subscribe"
                                            })
                                        ]
                                    }, plan.priceId)),
                                data?.user?.hadTrial ? null : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "h-80 w-80 mx-2 bg-white text-black-700 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                            className: "text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300",
                                            children: trial.name
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                            className: "flex-1 p-8 flex flex-col items-center",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                className: "text-gray-600 text-1xl",
                                                children: [
                                                    "$",
                                                    trial.price / 100,
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "text-black-400 text-sm uppercase",
                                                        children: trial.currency
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                            className: "hero-button py-4 text-white text-center",
                                            onClick: ()=>processPayment(trial.priceId),
                                            children: "Subscribe"
                                        })
                                    ]
                                }, trial.priceId)
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Container/* default */.Z, {
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex w-full items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "h-80 w-80 mx-2 bg-white text-black-700 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                            className: "text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300",
                                            children: "Feature List"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            className: "flex-1 p-8 flex flex-col items-left",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 font-bold text-center text-1xl",
                                                    children: "45 mins /month"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Use your own images"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Ask ChatGPT to create scripts"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Voice cloning"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "h-80 w-80 mx-2 bg-white text-black-700 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                            className: "text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300",
                                            children: "Feature List"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            className: "flex-1 p-8 flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 font-bold text-center text-1xl",
                                                    children: "15 mins /month"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Use your own images"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Ask ChatGPT to create scripts"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Voice cloning"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "h-80 w-80 mx-2 bg-white text-black-700 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                            className: "text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300",
                                            children: "Feature List"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            className: "flex-1 p-8 flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 font-bold text-center text-1xl",
                                                    children: "5 mins /month"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Use your own images"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Ask ChatGPT to create scripts"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Voice cloning"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                data?.user?.hadTrial ? null : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "h-80 w-80 mx-2 bg-white text-black-700 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                            className: "text-gray-600 text-2xl py-8 font-medium text-center border-b border-gray-300",
                                            children: "Feature List"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                            className: "flex-1 p-8 flex flex-col items-center",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 font-bold text-center text-1xl",
                                                    children: "3 mins/ 3 days"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Use your own images"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Ask ChatGPT to create scripts"
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "text-gray-600 text-center text-sm",
                                                    children: "Voice cloning"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
};
const getStaticProps = async ()=>{
    const stripe = (0,stripe_esm_node/* default */.Z)(process.env.STRIPE_SECRET_KEY);
    const { data: prices  } = await stripe.prices.list({
        active: true,
        recurring: {
            "interval": `month`
        },
        type: "recurring",
        limit: 3
    });
    const productPromises = prices.map(async (price)=>{
        const product = await stripe.products.retrieve(price.product);
        //const updatedProduct = await prisma.product.update({
        //  where: {
        //    name: product.name,
        //  },
        //  data: {
        //    priceId: price.id,
        //    price: price.unit_amount,
        //    interval: price.recurring.interval,
        //    currency: price.currency,
        //    type: 'recurring',
        //  },
        //});
        return {
            priceId: price.id,
            name: product.name,
            price: price.unit_amount,
            interval: price.recurring.interval,
            currency: price.currency
        };
    });
    const plans = await Promise.all(productPromises);
    const trial = await prisma/* default.product.findUnique */.Z.product.findUnique({
        where: {
            name: "New User Trial"
        }
    });
    return {
        props: {
            plans,
            trial
        }
    };
};
/* harmony default export */ const pricing = (PricingPage);


/***/ }),

/***/ 6953:
/***/ ((module) => {

module.exports = require("follow-redirects");

/***/ }),

/***/ 8941:
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 3149:
/***/ ((module) => {

module.exports = require("proxy-from-env");

/***/ }),

/***/ 7104:
/***/ ((module) => {

module.exports = require("qs");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 2081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 2781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [8954], () => (__webpack_exec__(4657)));
module.exports = __webpack_exports__;

})();