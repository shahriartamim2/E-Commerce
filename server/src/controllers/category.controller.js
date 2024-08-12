import createError from "http-errors";
import {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
} from "../services/categoryService.js";
import { successHandler } from "./responseHandler.controller.js";

const handleCreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await createCategory(name);

    return successHandler(res, {
      statusCode: 200,
      message: "New Category created successfully",
      payload: {
        newCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();
    if (!categories) {
      throw createError(404, "No categories found");
    }
    return successHandler(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      payload: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;

    const updatedCategory = await updateCategory(name, slug);

    if (!updatedCategory) {
      throw createError(404, "Failed to update category");
    }

    return successHandler(res, {
      statusCode: 200,
      message: "Category Updated successfully",
      payload: {
        updatedCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};
const handleGetSingleCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const category = await getSingleCategory(slug);
    if (!category) {
      throw createError(404, "No category found");
    }

    return successHandler(res, {
      statusCode: 200,
      message: "Category fetched successfully",
      payload: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  handleGetCategories,
  handleCreateCategory,
  handleGetSingleCategory,
  handleUpdateCategory,
};
