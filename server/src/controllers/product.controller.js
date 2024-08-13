import { checkProductExists, createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../services/productService.js";
import { successHandler } from "./responseHandler.controller.js";
import createError from "http-errors";



const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, sold, shipping, category } =
      req.body;

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
      return createError(400, "Product creation failed");
    }

    return successHandler(res, {
      statusCode: 201,
      message: "Product created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllProducts = async (req, res, next) => {
  try {
    const page = req.body.page||1;
    const limit = req.body.limit||5;

    const fetchedproducts = await getAllProducts(page, limit);
    if (!fetchedproducts) {
      return createError(404, "Products not found");
    }
    const { products, count } = fetchedproducts;
    return successHandler(res, {
      statusCode: 201,
      message: "Products fetched successfully",
      payload: fetchedproducts,
      pagination: {
        totalproducts : count,
        totalpages : Math.ceil(products.length/limit),
        currentpage : page,
        previouspage : page>1?page-1:null,
        nextpage : page<Math.ceil(products.length/limit)?page+1:null

      }
    });
  } catch (error) {
    next(error);
  }
};


const handleGetSingleProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;

    const product = await getSingleProduct(slug);
    if (!product) {
      return createError(404, "Product not found");
    }
    return successHandler(res, {
      statusCode: 201,
      message: "Products fetched successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};


const handleDeleteProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;

    const product = await deleteProduct(slug);

    if (!product) {
      return createError(404, "Product not found");
    }
    return successHandler(res, {
      statusCode: 201,
      message: "Products deleted successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};


const handleUpdateProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;

    const updatedProduct = await updateProduct(slug,  req);

    return successHandler(res, {
      statusCode: 200,
      message: "Product updated successfully",
      payload: {
        updatedProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};


export {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetSingleProduct,
  handleDeleteProduct,
  handleUpdateProduct,
};
