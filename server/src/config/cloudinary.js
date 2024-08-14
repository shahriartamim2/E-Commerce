
import { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryCloudName } from "../secret.js";

import { v2 as cloudinary } from "cloudinary";

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret:cloudinaryApiSecret,
  });
};

export default configureCloudinary;