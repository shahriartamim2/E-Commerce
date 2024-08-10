import mongoose from "mongoose";
import createError from "http-errors";

const findWithId = async (Model, id, options = {}) => {
  try {
    const item = await Model.findById(id, options);

    if (!item) {
      throw createError(500, `${Model.modelName} not found with this ID`);
    }
    return item;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createError(404, "invalid item Id");
    }
    throw error;
  }
};
export { findWithId };
