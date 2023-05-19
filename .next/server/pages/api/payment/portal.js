"use strict";
(() => {
var exports = {};
exports.id = 6255;
exports.ids = [6255];
exports.modules = {

/***/ 614:
/***/ ((module) => {

module.exports = require("next-auth/jwt");

/***/ }),

/***/ 8174:
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),

/***/ 7558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handle)
/* harmony export */ });
/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(614);
/* harmony import */ var next_auth_jwt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__);

const stripe = __webpack_require__(8174)(process.env.STRIPE_SECRET_KEY);
async function handle(req, res) {
    const token = await (0,next_auth_jwt__WEBPACK_IMPORTED_MODULE_0__.getToken)({
        req
    });
    const user = await prisma.user.findUnique({
        where: {
            id: token.user.id
        }
    });
    const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: process.env.CLIENT_URL
    });
    res.send({
        url: session.url
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7558));
module.exports = __webpack_exports__;

})();