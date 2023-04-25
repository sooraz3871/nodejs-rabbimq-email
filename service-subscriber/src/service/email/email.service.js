const nodemailer = require('nodemailer');
const logger = require('../../utils/logger/logger');
const { templates } = require('../../helpers/templates');

async function sendEmail(message,ch) {
    const data=JSON.parse(message)
    const {destination_email,email_subject=null,email_template=null,email_body=null}=data
    const {ETHEREAL_EMAIL:ethUser,ETHEREAL_PASSWORD:ethPass}=process.env
  try {
    // create reusable transporter object using the default SMTP transport
    // let testAccount = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure:false,
      auth: {
        user:ethUser, 
        pass:ethPass
      }
    });
    let template ="Default Template"
    if(email_template){
       template =  templates[email_template]
    }
    // setup email data 
    let mailOptions = {
      from: ethUser, // sender email
      to: destination_email, // list of receivers
      subject: email_subject, // Subject line
      text:email_body,
      html: template
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    return true
  } catch (error) {
    ch.nack(data);
    logger.info(error)
    throw error
  }
}


module.exports={sendEmail}
