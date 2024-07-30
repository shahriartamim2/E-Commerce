import User from "../models/user.model.js";
import { errorHandler } from "../controllers/responseHandler.controller.js";
import mongoose from "mongoose";
import createError from "http-errors";

const findUserById = async (id) => {
  try {
    const options = { password: 0 };
    const user = await User.findById(id, options);

    if (!user) {
      throw createError(500, "User not found")
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "invalid User Id")
    }
    throw error;
  }
};
export { findUserById };
