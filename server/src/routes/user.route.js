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
import { isLoggedIn } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id",isLoggedIn, getUserById);
userRouter.delete("/:id", deleteUserById);
userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/activate", activeUserAccount);
userRouter.put("/:id", upload.single("image"), updateUserById);

export default userRouter;
