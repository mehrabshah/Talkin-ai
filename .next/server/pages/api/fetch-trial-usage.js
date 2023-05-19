"use strict";
(() => {
var exports = {};
exports.id = 5415;
exports.ids = [5415];
exports.modules = {

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

/***/ 7761:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2146);

async function handler(req, res) {
    const email = req.query.email;
    const trialStartAt = req.query.trialStartAt;
    const result = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"].creation.aggregate */ .Z.creation.aggregate({
        _sum: {
            video_duration: true
        },
        where: {
            createdAt: {
                gte: trialStartAt
            },
            user: {
                email: email
            }
        }
    });
    res.json(result);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7761));
module.exports = __webpack_exports__;

})();