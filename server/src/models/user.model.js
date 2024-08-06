import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [30, "Name cannot be more than 30 characters long"],
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
      tolowercase: true,
    },
    password: {
      type: String,
      required: "Password is required",
      minlength: [6, "Password must be at least 6 characters long"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: Buffer,
      contentType: String,
      required: [true, "User image is required"],
    },
    phone: {
      type: String,
      required: "Phone is required",
    },
    address: {
      type: String,
      required: "Address is required",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
