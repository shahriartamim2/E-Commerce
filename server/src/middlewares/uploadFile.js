import multer from "multer";
import path from "path";
import createError from "http-errors";
import "dotenv/config";
import {
  ALLOWED_FILE_TYPE,
  MAX_FILE_SIZE,
  UPLOAD_USER_IMG_DIR,
} from "../config/index.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIR);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
        null,
        Date.now() + '-' + file.originalname.replace(extname, "") + extname
    )
  },
});

const fileFilter = (req,file, cb)=>{
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPE.includes(extname.substring(1))) {
    return cb(createError(400, "File type is not supported"));
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fimits: { filesize: MAX_FILE_SIZE },
  fileFilter: fileFilter,
});

export default upload;
