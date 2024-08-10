import {
  activeUserAccount,
  deleteUserById,
  getUserById,
  getUsers,
  handleUserStatusById,
  processRegister,
  updateUserById,
} from "../controllers/user.controller.js";
import Router from "express";
import upload from "../middlewares/uploadFile.js";
import { validateUserRegistration } from "../validator/auth.js";
import { runValidation } from "../validator/index.js";
import { isAdmin, isLoggedIn, isLoggedOut } from "../middlewares/auth.js";

const userRouter = Router();


userRouter.post(
  "/process-register",
  isLoggedOut,
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/activate",isLoggedOut, activeUserAccount);
userRouter.get("/", isLoggedIn,isAdmin, getUsers);
userRouter.get("/:id",isLoggedIn, getUserById);
userRouter.put("/:id", isLoggedIn, upload.single("image"), updateUserById);
userRouter.delete("/:id", isLoggedIn, deleteUserById);
userRouter.put("/manage-user-status/:id", isLoggedIn, isAdmin, handleUserStatusById);



export default userRouter;
