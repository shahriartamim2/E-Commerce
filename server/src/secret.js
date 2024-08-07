import "dotenv/config";

const serverPort = process.env.SERVER_PORT || 5001;
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://shahriartamim:shahriartamim@ecommerce.mvpegea.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce";
const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE || "../public/images/users/default.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "activation";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "access";

const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";

const clientUrl = process.env.CLIENT_URL;

export {
  smtpUser,
  smtpPass,
  serverPort,
  mongoUrl,
  defaultUserImage,
  jwtActivationKey,
  clientUrl,
  jwtAccessKey,
};
