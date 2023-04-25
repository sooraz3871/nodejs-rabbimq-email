"use strict";

const express = require("express");
const { publishToQue } = require("../controller/publish.controller");
const db = require("../helpers/db");
const router = express.Router();
const logger = require("../utils/logger/logger");
const { validateEmail } = require("../utils/validator");
const moment = require('moment');
const { getEmailsFromDB } = require("../methods/fetch_emails.method");

//Health-Check of the Publisher
router.get("/health-check", (req, res) => {
  try {
    const healthcheck = {
      uptime: process.uptime(),
      message: "Publisher-OK",
      timestamp: Date.now(),
    };
    res.status(200).send(healthcheck);
  } catch (err) {
    console.error("\x1b[43m\x1b[1m%s\x1b[0m", err);
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(500).send("Server Error");
  }
});

//Endpoint to send Email
router.post("/send", async (req, res) => {
  try {
    const { destination_email } = req.body;

    const validEmail = validateEmail(destination_email);
    if (!validEmail) {
      res.status(400).send("Please Enter a Valid Email")
    }
    else {
      await publishToQue(JSON.stringify(req.body));
      res.status(200).send("Email Sent");
    }
   
  } catch (err) {
    // console.error("\x1b[43m\x1b[1m%s\x1b[0m", err);
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(500).send("Server Error");
  }
});


router.get("/emails", async (req, res) => {
  try {

    const emails= await getEmailsFromDB(req.query)
    if (emails.length==0){
      res.status(404).send("No Emails Found")
      return
    }
    res.status(200).send(emails)
   
  } catch (err) {
    // console.error("\x1b[43m\x1b[1m%s\x1b[0m", err);
    logger.error(
      `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
    res.status(500).send("Server Error");
  }
});

module.exports = router;
