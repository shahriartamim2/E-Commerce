import express from "express";
import { handleCreateProduct, handleDeleteProduct, handleGetAllProducts, handleGetSingleProduct, handleUpdateProduct } from "../controllers/product.controller.js";
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
productRouter.get('/', handleGetAllProducts);
productRouter.get('/:slug', handleGetSingleProduct);
productRouter.delete("/:slug", handleDeleteProduct);
productRouter.put("/:slug", handleUpdateProduct);

export default productRouter;


