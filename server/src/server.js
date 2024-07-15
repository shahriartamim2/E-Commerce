import app from "./app.js";
import { serverPort } from "./secret.js";
app.listen(serverPort, () => {
  console.log(
    `Example app listening on port http://localhost:${serverPort}`
  );
});

