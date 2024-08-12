import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Category name is required",
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [31, "Category name cannot be more than 31 characters long"],
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: "Category slug is required",
      unique: true,
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
