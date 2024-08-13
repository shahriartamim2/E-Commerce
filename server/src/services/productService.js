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

const getAllProducts = async (search, page =1, limit=5) => {
      const searchRegExp = new RegExp(".*" + search + ".*", "i");
      const filter = {
        $or: [
          { name: { $regex: searchRegExp } },
        ],
      };
  const count = await Product.find(filter).countDocuments();
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("category");

  return { products, count };
};

const getSingleProduct = async (slug) => {
  const result = await Product.findOne({ slug: slug }).populate("category");

  return result;
};

const deleteProduct = async (slug) => {
  const result = await Product.findOneAndDelete({ slug: slug });
  return result;
};

const updateProduct = async (slug, req) => {
  try {
    const updateOptions = {
      new: true,
      runValidations: true,
      context: "query",
    };
    const product = await Product.findOne({ slug: slug });
    if (!product) {
      throw createError(404, "Product not found");
    }

    let updates = {};

    const allowedUpdates = [
      "name",
      "description",
      "price",
      "quantity",
      "sold",
      "shipping",
      "category",
    ];

    for (const key in req.body) {
      if (allowedUpdates.includes(key)) {
        if (key === "name") {
          updates.slug = slugify(req.body[key]);
        }
        updates[key] = req.body[key];
      }
    }

    const image = req.file;
    if (image) {
      if (
        image.mimetype !== "image/png" &&
        image.mimetype !== "image/jpeg" &&
        image.mimetype !== "image/jpg"
      ) {
        throw createError(
          400,
          "Please upload an image of type PNG or JPEG or JPG"
        );
      }
      if (image.size > 5 * 1024 * 1024) {
        throw createError(400, "Image size should not exceed 5MB");
      }
      updates.image = image.buffer.toString("base64");
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      updates,
      updateOptions
    );

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export {
  createProduct,
  checkProductExists,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
