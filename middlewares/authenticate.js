const jwt = require("jsonwebtoken");
const { User } = require("../models/schemas/user");
const { HttpError } = require("../helpers");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      next(HttpError(401));
    }
    req.user = user; // для дальнейшего использования
    next();
  } catch {
    console.log("error 401");
    next(HttpError(401));
  }
};

module.exports = authenticate;
