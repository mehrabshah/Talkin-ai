"use strict";
(() => {
var exports = {};
exports.id = 8170;
exports.ids = [8170,2261];
exports.modules = {

/***/ 2562:
/***/ ((module) => {

module.exports = require("@dqbd/tiktoken");

/***/ }),

/***/ 8500:
/***/ ((module) => {

module.exports = require("cohere-ai");

/***/ }),

/***/ 1967:
/***/ ((module) => {

module.exports = require("deepcopy");

/***/ }),

/***/ 5502:
/***/ ((module) => {

module.exports = require("eventemitter3");

/***/ }),

/***/ 8537:
/***/ ((module) => {

module.exports = require("exponential-backoff");

/***/ }),

/***/ 6953:
/***/ ((module) => {

module.exports = require("follow-redirects");

/***/ }),

/***/ 8941:
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),

/***/ 1906:
/***/ ((module) => {

module.exports = require("gpt-3-encoder");

/***/ }),

/***/ 7571:
/***/ ((module) => {

module.exports = require("hnswlib-node");

/***/ }),

/***/ 3118:
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ 3149:
/***/ ((module) => {

module.exports = require("proxy-from-env");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 3292:
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

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

/***/ }),

/***/ 5712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5337);
/* harmony import */ var langchain_embeddings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9044);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4557);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction




async function handler(req, res) {
    const body = req.body;
    const dir = path__WEBPACK_IMPORTED_MODULE_0___default().resolve(process.cwd(), "data");
    const vectorstore = await langchain_vectorstores__WEBPACK_IMPORTED_MODULE_1__/* .HNSWLib.load */ .FI.load(dir, new langchain_embeddings__WEBPACK_IMPORTED_MODULE_2__/* .OpenAIEmbeddings */ .V());
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        // Important to set no-transform to avoid compression, which will delay
        // writing response chunks to the client.
        // See https://github.com/vercel/next.js/issues/9965
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
    });
    const sendData = (data)=>{
        res.write(`data: ${data}\n\n`);
    };
    sendData(JSON.stringify({
        data: ""
    }));
    const chain = (0,_util__WEBPACK_IMPORTED_MODULE_3__.makeChain)(vectorstore, (token)=>{
        sendData(JSON.stringify({
            data: token
        }));
    });
    try {
        await chain.call({
            question: body.question,
            chat_history: body.history
        });
    } catch (err) {
        console.error(err);
    // Ignore error
    } finally{
        sendData("[DONE]");
        res.end();
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4591,6526,4557], () => (__webpack_exec__(5712)));
module.exports = __webpack_exports__;

})();