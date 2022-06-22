const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "caseydean8@gmail.com",
    pass: process.env.GMPASS,
  },
});