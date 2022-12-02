const multer = require("multer");
const path = require("path");
var CryptoJS = require("crypto-js");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    // File - MimeType - image/png

    const extension = file.mimetype.split("/")[1];
    req.savedProfileImage = "profile_image" + "." + extension;

    cb(null, req.savedProfileImage);
  },
});
const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Invalid file type");
  }
  
  return cb(null, true);
};

const profileImageUpload = multer({ storage, fileFilter });

module.exports = profileImageUpload;
