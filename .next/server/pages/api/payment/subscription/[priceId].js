"use strict";
(() => {
var exports = {};
exports.id = 5420;
exports.ids = [5420];
exports.modules = {

/***/ 614:
/***/ ((module) => {

module.exports = require("next-auth/jwt");

/***/ }),

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

/***/ 8268:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handle)
/* harmony export */ });
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2146);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1382);
/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(614);
/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_2__);



const stripe = (0,stripe__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(process.env.STRIPE_SECRET_KEY);
async function handle(req, res) {
    try {
        const { priceId  } = req.query;
        const token = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_2__.getToken)({
            req
        });
        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.findUnique */ .Z.user.findUnique({
            where: {
                id: token.user.id
            }
        });
        const lineItems = [
            {
                price: priceId,
                quantity: 1
            }
        ];
        const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId,
            payment_method_types: [
                "card"
            ],
            line_items: lineItems,
            mode: "subscription",
            success_url: `${process.env.CLIENT_URL}/payment/success`,
            cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
            currency: "usd"
        });
        res.json({
            id: session.id
        });
    } catch (err) {
        res.send(err);
    }
}
;


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1382], () => (__webpack_exec__(8268)));
module.exports = __webpack_exports__;

})();