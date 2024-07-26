import "dotenv/config";

const serverPort = process.env.SERVER_PORT || 5001;
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://shahriartamim:shahriartamim@ecommerce.mvpegea.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce";

export {serverPort, mongoUrl};