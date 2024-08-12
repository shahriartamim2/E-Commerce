import { createCategory, getCategories, getSingleCategory } from "../services/categoryService.js";
import { successHandler } from "./responseHandler.controller.js";

const handleCreateCategory = async (req, res,next) => {

try {
    const {name} = req.body;

    const newCategory = await createCategory(name);

    return successHandler(res, {
        statusCode: 200,
        message: "New Category created successfully",
        payload: {
            newCategory
        },  
    })

} catch (error) {
    next(error);
}
};


const handleGetCategories = async (req, res, next) => {
  try {
    const categories = await getCategories();
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


const handleGetSingleCategory = async (req, res, next) => {
  try {
    const{slug} =req.params;
    const category = await getSingleCategory(slug);
 
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


export { handleGetCategories, handleCreateCategory, handleGetSingleCategory };