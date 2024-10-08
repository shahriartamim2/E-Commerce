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

const deleteCloudinaryImage = async (imageUrl, folderName) => {
  const arr = imageUrl.split("/");
  const publicId = arr[arr.length - 1]
    .replace(".jpg", "")
    .replace(".png", "")
    .replace(".jpeg", "")
    .replace(".", "");
  try {
    const result = await cloudinary.uploader.destroy(
      `${folderName}/${publicId}`
    );
    if (result.result === "not found") {
      console.log("Image not found in Cloudinary.");
      return null; // Or handle as you see fit
    }
    return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error; // Optionally, rethrow the error
  }
};







export { uploadCloudinaryImage, deleteCloudinaryImage };
