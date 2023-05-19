"use strict";
(() => {
var exports = {};
exports.id = 2275;
exports.ids = [2275];
exports.modules = {

/***/ 7712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
async function handler(req, res) {
    const response = await fetch("https://api.replicate.com/v1/predictions/" + req.query.id, {
        headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json"
        }
    });
    if (response.status !== 200) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({
            detail: error.detail
        }));
        return;
    }
    const prediction = await response.json();
    res.end(JSON.stringify(prediction));
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7712));
module.exports = __webpack_exports__;

})();