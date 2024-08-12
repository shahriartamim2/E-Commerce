import slugify from "slugify";
import Category from "../models/category.model.js";
import createError from "http-errors";
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

const updateCategory = async (name, slug) => {
  try {
    const filter = { slug: slug };
    const updates = { name: name, slug: slugify(name) };
    const options = { new: true };

    const updatedCategory = await Category.findOneAndUpdate(
      filter,
      updates,
      options
    );
    return updatedCategory;
  } catch (error) {
    throw createError(500, "Failed to update. No category found");
  }
};

export { createCategory, getCategories, getSingleCategory, updateCategory };
