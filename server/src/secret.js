import "dotenv/config";

const serverPort = process.env.SERVER_PORT || 5001;
const mongoUrl =
  process.env.MONGO_URL ||'';
const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE || "../public/images/users/default.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "123";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "123";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "123";
const jwtPasswordResetKey = process.env.JWT_PASSWORD_RESET_KEY||"123";

const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";

const clientUrl = process.env.CLIENT_URL;


const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || "";
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET || "";

export {
  smtpUser,
  smtpPass,
  serverPort,
  mongoUrl,
  defaultUserImage,
  jwtActivationKey,
  clientUrl,
  jwtAccessKey,
  jwtPasswordResetKey,
  jwtRefreshKey,
  cloudinaryCloudName,
  cloudinaryApiKey,
  cloudinaryApiSecret,

};
