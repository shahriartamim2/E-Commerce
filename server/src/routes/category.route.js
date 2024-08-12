import express from 'express';
import { handleCreateCategory } from '../controllers/category.controller.js';
import { validateCategory } from '../validator/category.js';
import { runValidation } from '../validator/index.js';
import { isAdmin, isLoggedIn } from '../middlewares/auth.js';

const categoryRouter = express.Router();


categoryRouter.post('/',isLoggedIn, isAdmin, validateCategory, runValidation, handleCreateCategory);



export default categoryRouter;