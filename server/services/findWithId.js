import User from "../models/user.model.js";
import { errorHandler } from "../controllers/responseHandler.controller.js";
import mongoose from "mongoose";
import createError from "http-errors";

const findWithId = async (id, options={}) => {
  try {
    
    const item = await User.findById(id, options);

    if (!item) {
      throw createError(500, "Item not found with this ID")
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "invalid item Id")
    }
    throw error;
  }
};
export { findWithId };
