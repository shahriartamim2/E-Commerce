import nodemailer from 'nodemailer';
import { smtpPass, smtpUser } from '../secret.js';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const sendEmailWithNodeMailer = async (emailData) => {
  // send mail with defined transport object
  const emailInfo = {
    from: '"Abdullah Noman 👻" <abdnoman1616@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: emailData.subject, // Subject line
    text: "User Email Activation", // plain text body
    html: emailData.html, // html body
  }; 
  
  try {
    const info = await transporter.sendMail(emailInfo);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
    throw createError(500, "Email not sent");
  }
}


export default sendEmailWithNodeMailer;