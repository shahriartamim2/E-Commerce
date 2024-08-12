import slugify from "slugify";
import Category from "../models/category.model.js";

const createCategory = async (name) => {
  const newCategory = await Category.create({
    name: name,
    slug: slugify(name),
  });

  return newCategory;
};

const getCategories = async () => {
  const categories = await Category.find({}).select("name slug");
  return categories;
};

const getSingleCategory = async (slug) => {
  const category = await Category.findOne({ slug: slug }).select("name slug");
  return category;
};

export { createCategory, getCategories, getSingleCategory };