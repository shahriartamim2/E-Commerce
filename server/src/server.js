import app from "./app.js";
import { serverPort } from "./secret.js";
import connectDB from "../config/db.js";

connectDB();

app.listen(serverPort, () => {
  console.log(
    `Example app listening on port http://localhost:${serverPort}`
  );
});

