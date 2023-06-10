const { HttpError } = require("../../helpers");
const { usersService } = require("../../models/service");

const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const { filename, path: pathTemp } = req.file;

  const pathNew = path.resolve("public", "avatars") + "/" + filename;
  await fs.rename(pathTemp, pathNew);

  Jimp.read(pathNew, (err, avatar) => {
    if (err) throw err;
    avatar.resize(256, 256).write(pathNew);
  });

  const avatarURL = "avatars" + "/" + filename;
  const { _id: id } = req.user;
  result = await usersService.updateAvatar(id, avatarURL);

  if (!result) {
    throw HttpError(401);
  }

  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;
