import {
  activeUserAccount,
  deleteUserById,
  getUserById,
  getUsers,
  processRegister,
} from "../controllers/user.controller.js";
import Router from "express";
import upload from "../middlewares/uploadFile.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.delete("/user/:id", deleteUserById);
userRouter.post("/user/process-register",upload.single("image"), processRegister);
userRouter.post("/user/verify", activeUserAccount);

export default userRouter;
