import multer from "multer";
import createError from "http-errors";
import "dotenv/config";
import {
  ALLOWED_FILE_TYPE,
  MAX_FILE_SIZE,
} from "../config/index.js";

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
})

const fileFilter = (req,file, cb)=>{
  if(!file.mimetype.startsWith("image/")){
    return cb(createError(400, "Please upload an image file"), false);
  }
  if(file.size>MAX_FILE_SIZE){
    return cb(createError(400, "File size should not be greater than 2 mb"), false);
  }
  if(!ALLOWED_FILE_TYPE.includes(file.mimetype)){
    return cb(createError(400,"File type not allowed"), false);
  }
  cb(null, true);
}

const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default uploadImage;
