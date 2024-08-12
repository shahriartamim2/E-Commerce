import { createCategory } from "../services/categoryService.js";
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


export { handleCreateCategory };