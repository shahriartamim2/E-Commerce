import app from "./app.js";
import connectDB from "./config/db.js";
import { serverPort } from "./secret.js";


connectDB();

app.listen(serverPort, () => {
  console.log(
    `Example app listening on port http://localhost:${serverPort}`
  );
});

