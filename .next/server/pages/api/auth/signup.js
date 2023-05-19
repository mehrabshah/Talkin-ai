"use strict";
(() => {
var exports = {};
exports.id = 7011;
exports.ids = [7011];
exports.modules = {

/***/ 7096:
/***/ ((module) => {

module.exports = require("bcrypt");

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

/***/ 2745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2146);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7096);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1382);



const stripe = (0,stripe__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(process.env.STRIPE_SECRET_KEY);
const handler = async (req, res)=>{
    try {
        // check if user already exists
        const { fullname , email , password  } = req.body;
        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.findUnique */ .Z.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            return res.json({
                data: null,
                error: "User already exists"
            });
        } else {
            // create new stripe customer
            const customer = await stripe.customers.create({
                email
            });
            // create new user
            const user1 = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].user.create */ .Z.user.create({
                data: {
                    email,
                    password: await (0,bcrypt__WEBPACK_IMPORTED_MODULE_1__.hash)(password, 10),
                    fullname,
                    stripeCustomerId: customer.id
                }
            });
            return res.json({
                data: "Registration",
                error: null
            });
        }
    } catch (error) {
        res.status(500).json({
            data: null,
            error: "something went wrong"
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1382], () => (__webpack_exec__(2745)));
module.exports = __webpack_exports__;

})();