import { getUsers } from "../controllers/user.controller.js";
import Router from "express";   

const userRouter = Router();

userRouter.get('/users', getUsers)

export default userRouter;