import { getUser, getUsers } from "../controllers/user.controller.js";
import Router from "express";   

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/user/:id', getUser);

export default userRouter;