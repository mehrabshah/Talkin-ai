"use strict";
(() => {
var exports = {};
exports.id = 1853;
exports.ids = [1853];
exports.modules = {

/***/ 6950:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
async function handler(req, res) {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // Pinned to a specific version of Stable Diffusion
            // See https://replicate.com/talkin-ai/bot/versions
            //version: "3eb864151ba2e194409f66ff02b91a046680fc54265c88f5aa193245e8e2afcb",
            //version: "37171cc1d17a37ff4192ad296b1964cf9345797a7907d6f472cfd34cd89e3e9f",
            //version: "c0175c287dbcc4cd2d0086ef400738a8614ae26e8c76d6703d316cdb29aeb3de",
            //version: "bd53a53b56e1c23dcb9ecfd8dd2612cf3ae3fa0ce3c9737c0fb5dcadb5c75c37",
            version: "8bbef98531dc22c1bd1ad382923bf2245628eb595a2b43973edfcd50d664a6f9",
            // This is the text prompt that will be submitted by a form on the frontend
            input: req.body
        })
    });
    if (response.status !== 201) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({
            detail: error.detail
        }));
        return;
    }
    const prediction = await response.json();
    res.statusCode = 201;
    res.end(JSON.stringify(prediction));
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6950));
module.exports = __webpack_exports__;

})();