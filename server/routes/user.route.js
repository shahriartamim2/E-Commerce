import {
  deleteUserById,
  getUserById,
  getUsers,
} from "../controllers/user.controller.js";
import Router from "express";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.delete("/user/:id", deleteUserById);

export default userRouter;
