import {
  deleteUserById,
  getUserById,
  getUsers,
  processRegister,
} from "../controllers/user.controller.js";
import Router from "express";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.delete("/user/:id", deleteUserById);
userRouter.post("/user/process-register", processRegister);

export default userRouter;
