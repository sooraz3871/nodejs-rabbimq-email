const db = require("../helpers/db");
const logger = require("../utils/logger/logger");

const saveUserToDB = async (email_data) => {
  try {
    const { destination_email, email_body = null } = email_data;
    let sent_date = new Date();
    sent_date = sent_date.toISOString().split("T")[0];
    const email = await db.Email.create({
      sent_to: destination_email,
      sent_date: sent_date,
      mail_body:email_body
    });

    await email.save();
  } catch (error) {
    console.error("\x1b[43m\x1b[1m%s\x1b[0m", error);
    logger.info(error);
  }
};

module.exports = { saveUserToDB };
