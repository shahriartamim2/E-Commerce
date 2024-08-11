import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./controllers/logger.controller.js";
import { serverPort } from "./secret.js";


connectDB();

app.listen(serverPort, () => {
  logger.log('info',
    `Server is listening on port http://localhost:${serverPort}`
  );
});

