import Product from "../models/product.model.js";
import slugify from "slugify";


const createProduct = async (product) =>{

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
}

const checkProductExists = async (name) => {

    return await Product.findOne({ name });

}

export { createProduct, checkProductExists };