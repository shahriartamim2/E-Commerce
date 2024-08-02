import multer from "multer";
import { uploadDir } from "../src/secret.js";
import path from "path";
import createError from "http-errors";
import "dotenv/config";


const maxFileSize = Number(process.env.MAX_FILE_SIZE) || 1024 * 1024 * 5; // 5MB
const fileType = process.env.FILE_TYPE || ['jpg', "jpeg", "png"];

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

const fileFilter = (req,file, cb)=>{
  const extname = path.extname(file.originalname);
  if(!fileType.includes(extname.substring(1))){

    return cb(createError(400, 'File type is not supported'));
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fimits: { filesize: maxFileSize },
  fileFilter: fileFilter,
});

export default upload;
