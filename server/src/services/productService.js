import Product from "../models/product.model.js";
import slugify from "slugify";

const createProduct = async (product) => {
  const {
    name,
    description,
    price,
    quantity,
    sold,
    shipping,
    imageBufferString,
    category,
  } = product;

  const newProduct = {
    name: name,
    slug: slugify(name),
    description: description,
    price: price,
    quantity: quantity,
    sold: sold,
    shipping: shipping,
    image: imageBufferString,
    category: category,
  };

  const createdProduct = await Product.create(newProduct);

  return createdProduct;
};

const checkProductExists = async (name) => {
  return await Product.findOne({ name });
};

const getAllProducts = async (page, limit) => {
  const count = await Product.find({}).countDocuments();
  const products = await Product.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category");

  return { products, count };
};


const getSingleProduct = async (slug) => {

  const result = await Product.findOne({slug:slug}).populate("category");

  return result;
};

export { createProduct, checkProductExists, getAllProducts, getSingleProduct };
