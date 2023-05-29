const { User } = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;
const { SECRET_KEY } = process.env;

async function addUser({ password, ...data }) {
  const passwordDB = await bcrypt.hash(password, saltRounds);
  return await User.create({ password: passwordDB, ...data });
}

async function findEmailUser(email) {
  return await User.findOne({ email });
}

async function controlPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function createToken(id) {
  const payload = {
    id,
  };
  console.log("токен создан");

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
}

async function addToken(id, token) {
  return await User.findByIdAndUpdate(id, { token });
}

async function findUser(id) {
  return await User.findById(id);
}

async function deleteToken(id) {
  return await User.findByIdAndUpdate(id, { token: "" });
}

async function updateSubscription(id, subscription) {
  return await User.findByIdAndUpdate(id, { subscription: subscription });
}

module.exports = {
  addUser,
  findEmailUser,
  controlPassword,
  createToken,
  addToken,
  findUser,
  deleteToken,
  updateSubscription,
};
