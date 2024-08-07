import {
  activeUserAccount,
  deleteUserById,
  getUserById,
  getUsers,
  processRegister,
  updateUserById,
} from "../controllers/user.controller.js";
import Router from "express";
import upload from "../middlewares/uploadFile.js";
import { validateUserRegistration } from "../validator/auth.js";
import { runValidation } from "../validator/index.js";

const userRouter = Router();

userRouter.get("/users", getUsers);
userRouter.get("/user/:id", getUserById);
userRouter.delete("/user/:id", deleteUserById);
userRouter.post(
  "/user/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/user/verify", activeUserAccount);
userRouter.put("/user/:id", upload.single("image"), updateUserById);

export default userRouter;
