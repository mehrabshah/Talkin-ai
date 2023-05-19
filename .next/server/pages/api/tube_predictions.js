"use strict";
(() => {
var exports = {};
exports.id = 4659;
exports.ids = [4659];
exports.modules = {

/***/ 2078:
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
            //version: "c29e89e10e3c601ae3c60a6f64f120e0d279288120382c6a8bfecaf6ceec7213",
            //version: "aab2f75869a09559c7624cca903591bf425418bf7f3e3bcfd0ebe50a1e03fb87",
            version: "5c3ec513526dae1cd86c5d6d25c71b6428c873b5cd93da1a6eb2e289ed5f53d1",
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
var __webpack_exports__ = (__webpack_exec__(2078));
module.exports = __webpack_exports__;

})();