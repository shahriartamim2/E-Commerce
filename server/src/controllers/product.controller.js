import { checkProductExists, createProduct } from "../services/productService.js";
import { successHandler } from "./responseHandler.controller.js";
import createError from "http-errors";


const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, sold, shipping, category } = req.body;

    const imageBufferString = req.file.buffer.toString("base64");

    const productExists = await checkProductExists(name);
    if (productExists) {
      throw createError(409, "Product already exists");
    }

    const product = {
      name,
      description,
      price,
      quantity,
      sold,
      shipping,
      imageBufferString,
      category,
    };

    const newProduct = await createProduct(product);
    if (!newProduct) {
      return res.status(400).json({ error: "Product creation failed" });
    }

    return successHandler(res, {
      statusCode: 201,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { handleCreateProduct };
