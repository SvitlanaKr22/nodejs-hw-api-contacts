const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const pathTemp = path.resolve("temp"); //path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: pathTemp,
  filename: (req, file, cb) => {
    const { _id } = req.user;
    const newName = `${_id}` + "-" + `${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1048576, //default
};

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;

  if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
    cb(HttpError(400, "File can have only .jpg or .png extension"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
