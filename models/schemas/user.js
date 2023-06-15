const Joi = require("joi");
const { Schema, model } = require("mongoose");
const emailRegExp = /.+@.+..+/i;

const userSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  subscription: Joi.string(),
  token: [Joi.string(), Joi.number()],
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const subscrptSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

const schema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("User", schema);

module.exports = {
  userSchema,
  loginSchema,
  subscrptSchema,
  User,
};
