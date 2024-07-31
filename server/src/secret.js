import "dotenv/config";

const serverPort = process.env.SERVER_PORT || 5001;
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://shahriartamim:shahriartamim@ecommerce.mvpegea.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce";
const defaultUserImage = process.env.DEFAULT_USER_IMAGE || "../public/images/users/default.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "activation";

export { serverPort, mongoUrl, defaultUserImage, jwtActivationKey };