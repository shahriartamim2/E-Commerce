import express from 'express';
import { handleCreateCategory, handleGetCategories, handleGetSingleCategory, handleUpdateCategory } from '../controllers/category.controller.js';
import { validateCategory } from '../validator/category.js';
import { runValidation } from '../validator/index.js';
import { isAdmin, isLoggedIn } from '../middlewares/auth.js';

const categoryRouter = express.Router();


categoryRouter.post('/',isLoggedIn, isAdmin, validateCategory, runValidation, handleCreateCategory);
categoryRouter.get('/',handleGetCategories);
categoryRouter.get('/:slug',handleGetSingleCategory);
categoryRouter.put(
  "/:slug",
  isLoggedIn,
  isAdmin,
  validateCategory,
  runValidation,
  handleUpdateCategory
);



export default categoryRouter;