import { v2 as cloudinary } from "cloudinary";
import configureCloudinary from "../config/cloudinary.js";
import createError from "http-errors";

configureCloudinary();

const uploadCloudinaryImage = async (req, folderName, model) => {
  try {
    // Wrap the upload_stream in a Promise to handle the asynchronous nature
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    // Return the secure_url from the upload result
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw createError(500, `${model} Image upload failed`);
  }
};





export { uploadCloudinaryImage };
