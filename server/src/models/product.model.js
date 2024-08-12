
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Product name is required",
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [150, "Name cannot be more than 150 characters long"],
    },
        slug: {
      type: String,
      lowercase: true,
      required: "Product slug is required",
      unique: true,
    },
    price: {
        type: Number,
        trim: true,
        required: "Product price is required",
        min: [1, "Price cannot be less than 1"],
validate: {
    validator: (v) => v > 0,
    message: "Price cannot be less than 1"
}
},
    description: {
        type: String,
        required: "Product description is required",
        minlength: [3, "Description must be at least 3 characters long"],
        maxlength: [500, "Description cannot be more than 500 characters long"],
    },
    image: {
      type: Buffer,
      contentType: String,
      required: [true, "User image is required"],
    },
    sold: {
        type: Number,
        default: 0,
    },
    shipping:{
        type: Number,
        default: 0,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: "Category is required",
    },
    quantity:{
        type: Number,
        required: "Product quantity is required",
        min: [1, "Quantity cannot be less than 1"],
validate: {
    validator: (v) => v > 0,
    message: "Quantity cannot be less than 1"
}
    },
  },
  { timestamps: true }

);

const Product = mongoose.model("Product", productSchema);

export default Product;
