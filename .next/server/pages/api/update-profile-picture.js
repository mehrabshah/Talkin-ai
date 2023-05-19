"use strict";
(() => {
var exports = {};
exports.id = 5111;
exports.ids = [5111];
exports.modules = {

/***/ 614:
/***/ ((module) => {

module.exports = require("next-auth/jwt");

/***/ }),

/***/ 7303:
/***/ ((module) => {

module.exports = require("trouter");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

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

/***/ 4590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ update_profile_picture)
});

// EXTERNAL MODULE: ./node_modules/next-connect/dist/index.js
var dist = __webpack_require__(3419);
// EXTERNAL MODULE: external "next-auth/jwt"
var jwt_ = __webpack_require__(614);
;// CONCATENATED MODULE: external "multer"
const external_multer_namespaceObject = require("multer");
var external_multer_default = /*#__PURE__*/__webpack_require__.n(external_multer_namespaceObject);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
;// CONCATENATED MODULE: external "datauri/parser"
const parser_namespaceObject = require("datauri/parser");
var parser_default = /*#__PURE__*/__webpack_require__.n(parser_namespaceObject);
;// CONCATENATED MODULE: external "cloudinary"
const external_cloudinary_namespaceObject = require("cloudinary");
var external_cloudinary_default = /*#__PURE__*/__webpack_require__.n(external_cloudinary_namespaceObject);
;// CONCATENATED MODULE: ./utils/cloudinary.js

external_cloudinary_default().v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
/* harmony default export */ const cloudinary = ((external_cloudinary_default()));

// EXTERNAL MODULE: ./lib/prisma.js + 1 modules
var prisma = __webpack_require__(2146);
;// CONCATENATED MODULE: ./pages/api/update-profile-picture.js







const handler = (0,dist/* default */.Z)({
    onError: (err, res)=>{
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res)=>{
        res.status(404).end("Page is not found");
    }
}).use(external_multer_default()().single("image")).post(async (req, res)=>{
    const image = req.file;
    try {
        const token = await (0,jwt_.getToken)({
            req
        });
        // if no token
        if (!token) {
            return res.status(403).json({
                error: "You are not signed in",
                data: null
            });
        }
        const userId = token.user.id;
        // check if user is authorised
        //if (!(req.body.id === userId)) {
        //  return res.status(403).json({ error: 'You cannot perform this operation.', data: null });
        //}
        // instantiate a parser
        const parser = new (parser_default())();
        // check if user already has a picture
        if (req.body.imageId) {
            // destroy existing image on cloudinary
            await cloudinary.v2.uploader.destroy(req.body.imageId);
        }
        // create new one
        const base64Image = await parser.format(external_path_default().extname(image.originalname).toString(), image.buffer);
        const uploadedImageResponse = await cloudinary.uploader.upload(base64Image.content, "profile_avatar", {
            resource_type: "image"
        });
        const profilePictureId = uploadedImageResponse.public_id;
        const profilePicture = uploadedImageResponse.url;
        const updatedUser = await prisma/* default.user.update */.Z.user.update({
            where: {
                id: userId
            },
            data: {
                profilePicture: profilePicture,
                profilePictureId: profilePictureId
            }
        });
        res.json({
            error: null,
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong. Please try again",
            data: null
        });
    }
});
// disable body parser
const config = {
    api: {
        bodyParser: false
    }
};
/* harmony default export */ const update_profile_picture = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [3419], () => (__webpack_exec__(4590)));
module.exports = __webpack_exports__;

})();