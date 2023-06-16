const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  email = { ...data, from: SENDGRID_SENDER_EMAIL };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
