import slugify from "slugify";
import Category from "../models/category.model.js";

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });

  return newCategory;
};

export { createCategory };