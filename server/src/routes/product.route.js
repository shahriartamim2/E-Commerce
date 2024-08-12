import express from "express";
import { handleCreateProduct } from "../controllers/product.controller.js";
import { validateCreateProduct } from "../validator/product.js";
import { isAdmin, isLoggedIn, isLoggedOut } from "../middlewares/auth.js";
import { runValidation } from "../validator/index.js";
import upload from "../middlewares/uploadFile.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  validateCreateProduct,
  runValidation,
  handleCreateProduct
);


export default productRouter;


