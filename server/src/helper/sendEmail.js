import createError from "http-errors";
import sendEmailWithNodeMailer from "./email.js";

const sendEmail = async (emailData) => {
  try {
    await sendEmailWithNodeMailer(emailData);
  } catch (error) {
    throw createError(500, "Email not sent. Please try again");
  }
};

export default sendEmail;