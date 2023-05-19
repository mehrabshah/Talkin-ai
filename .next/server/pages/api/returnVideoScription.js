"use strict";
(() => {
var exports = {};
exports.id = 5818;
exports.ids = [5818];
exports.modules = {

/***/ 7512:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
const generateScription = async ({ role , topic , keyWords , tone , numWords  })=>{
    try {
        const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: `Act as a ${role || "professional speech writer"}, Write a youtube video speech on ${topic}, 
          that is around ${numWords || 200} words in a ${tone || "neutral"} tone. ${keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""}. The video script should be described in a way that is professional, intelligent and intriguing.`,
                max_tokens: 300,
                temperature: 0.5
            })
        });
        const data = await response.json();
        return data.choices[0].text;
    } catch (err) {
        console.error(err);
    }
};
async function handler(req, res) {
    const { role , topic , keyWords , tone , numWords  } = req.body;
    const videoScription = await generateScription({
        role,
        topic,
        keyWords,
        tone,
        numWords
    });
    res.status(200).json({
        videoScription
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7512));
module.exports = __webpack_exports__;

})();