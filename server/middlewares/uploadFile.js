import multer from "multer";
import { uploadDir } from "../src/secret.js";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
        null,
        Date.now() + '-' + file.originalname.replace(extname, "") + extname
    )
  },
});

const upload = multer({ storage: storage });

export default upload;
