"use strict";
(() => {
var exports = {};
exports.id = 7287;
exports.ids = [7287];
exports.modules = {

/***/ 9933:
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
            //version: "919a1f68428fdaaf82309eb5972b622231e53ece32c84f1afe8dd85a6ca540ff",
            version: "2442eef54c3952f70025ed22b825e4ca188ea640f8207792a5f260d5e6ffdc0b",
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
var __webpack_exports__ = (__webpack_exec__(9933));
module.exports = __webpack_exports__;

})();