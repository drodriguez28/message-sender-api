require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mg(auth));

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: "deivid_business_sender@outlook.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info);
      res.send("Email sent successfully");
    }
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
