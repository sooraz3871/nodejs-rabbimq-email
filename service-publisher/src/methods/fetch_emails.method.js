const db = require("../helpers/db");
const logger = require("../utils/logger/logger");
const moment = require("moment");

const getEmailsFromDB = async ({ ...params }) => {
  try {
    const {
      email = null,
      start_date = null,
      end_date = null,
      sent_date = null,
      emails=null,
    } = params;

    let range = false;
    let email_address = false;
    let email_sent_date = false;
    let email_addresses = false;

    if (start_date !== null && end_date !== null) {
      range = true;
    }
    if (email !== null) {
      email_address = true;
    }

    if (emails !== null) {
      email_addresses = true;
    }

    if (sent_date !== null) {
      email_sent_date = true;
    }

    //if only range is provided
    if (range && !email_address && !email_addresses && !email_sent_date) {
      const gte = moment.utc(start_date);
      const lte = moment.utc(end_date);
      const data = await db.Email.find({
        sent_date: {
          $gte: gte,
          $lte: lte,
        },
      });
      return data;
    }

    //if only email address is provided
    if (email_address && !range && !email_addresses && !email_sent_date) {
      const data = await db.Email.find({ sent_to: email });
      return data;
    }

    //if email and  range is provided
    // if (range && email_address) {
    //   const gte = moment.utc(start_date);
    //   const lte = moment.utc(end_date);
    //   return;
    // }

    //if emai addresses  and  range is provided
    if (range && email_addresses) {
      const sdate = moment.utc(start_date);
      const edate = moment.utc(end_date);
      const email_array= emails.split(",")

      const data = await db.Email.aggregate([
        {
          $match: {
            $and: [
              { sent_to: { $in: email_array } },
              // {
              //   sent_date: {
              //     $gte: sdate,
              //     $lte: edate,
              //   }
              // },
            ],
          },
        },
      ]);
      
      return data;
    }
    //if emai address and  range is provided
    // if (email_sent_date && email_address) {
    //   const mail_sent_on = moment.utc(email_sent_date);
    //   return;
    // }
  } catch (error) {
    console.error("\x1b[43m\x1b[1m%s\x1b[0m", error);
    logger.error(error);
  }
};

module.exports = { getEmailsFromDB };
