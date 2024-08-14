import express from "express";
import { handleCreateProduct, handleDeleteProduct, handleGetAllProducts, handleGetSingleProduct, handleUpdateProduct } from "../controllers/product.controller.js";
import { validateCreateProduct } from "../validator/product.js";
import { isAdmin, isLoggedIn, isLoggedOut } from "../middlewares/auth.js";
import { runValidation } from "../validator/index.js";
import uploadImage from "../middlewares/uploadFile.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  uploadImage.single("image"),
  validateCreateProduct,
  runValidation,
  handleCreateProduct
);
productRouter.get('/', handleGetAllProducts);
productRouter.get('/:slug', handleGetSingleProduct);
productRouter.delete("/:slug",isLoggedIn, isAdmin, handleDeleteProduct);
productRouter.put("/:slug",isLoggedIn, isAdmin, handleUpdateProduct);

export default productRouter;


