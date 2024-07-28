import User from "../models/user.model.js";
import Router from "express";   

const userRouter = Router();

userRouter.get('/users', getUsers)

export default userRouter;