"use strict";
(() => {
var exports = {};
exports.id = 846;
exports.ids = [846];
exports.modules = {

/***/ 7104:
/***/ ((module) => {

module.exports = require("qs");

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

/***/ 2146:
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

/***/ 8606:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ hooks)
});

// EXTERNAL MODULE: ./node_modules/stripe/esm/stripe.esm.node.js + 110 modules
var stripe_esm_node = __webpack_require__(1382);
;// CONCATENATED MODULE: external "micro"
const external_micro_namespaceObject = require("micro");
// EXTERNAL MODULE: ./lib/prisma.js + 1 modules
var prisma = __webpack_require__(2146);
;// CONCATENATED MODULE: ./pages/api/payment/hooks.js
// pages/api/stripe-hooks



const stripe = (0,stripe_esm_node/* default */.Z)(process.env.STRIPE_SECRET_KEY);
const config = {
    api: {
        bodyParser: false
    }
};
/* harmony default export */ const hooks = (async (req, res)=>{
    const reqBuffer = await (0,external_micro_namespaceObject.buffer)(req);
    const signature = req.headers["stripe-signature"];
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
    } catch (err) {
        console.log(err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    //const { metadata } = event.data.object;
    const stripeCustomerId = event.data.object.customer;
    switch(event.type){
        case "charge.succeeded":
            const { metadata  } = event.data.object;
            if (metadata?.userId && metadata?.productId) {
                const user = await prisma/* default.user.update */.Z.user.update({
                    where: {
                        id: parseInt(metadata.userId)
                    },
                    data: {
                        hadTrial: true,
                        onTrial: true,
                        trialStartAt: new Date(),
                        products: {
                            connect: {
                                priceId: metadata.productId
                            }
                        }
                    }
                });
                const result = await prisma/* default.purchase.create */.Z.purchase.create({
                    data: {
                        priceId: metadata.productId,
                        userId: parseInt(metadata.userId)
                    }
                });
            }
            break;
        case "customer.subscription.updated":
            const subscription = event.data.object;
            const priceId = subscription.items.data[0].price.id;
            if (stripeCustomerId) {
                await prisma/* default.user.update */.Z.user.update({
                    where: {
                        stripeCustomerId
                    },
                    data: {
                        hadTrial: true,
                        isSubscribed: true,
                        productSubscribed: priceId,
                        currentPeriodStart: new Date(),
                        products: {
                            connect: {
                                priceId: priceId
                            }
                        }
                    }
                });
                await prisma/* default.purchase.create */.Z.purchase.create({
                    data: {
                        priceId: priceId,
                        stripeCustomerId: stripeCustomerId
                    }
                });
            }
            break;
        case "customer.subscription.deleted":
            await prisma/* default.user.update */.Z.user.update({
                where: {
                    stripeCustomerId
                },
                data: {
                    isSubscribed: false
                }
            });
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.send({
        received: true
    });
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1382], () => (__webpack_exec__(8606)));
module.exports = __webpack_exports__;

})();