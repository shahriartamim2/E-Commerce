import {
  handleactiveUserAccount,
  handledeleteUserById,
  handlegetUserById,
  handlegetUsers,
  handleUserStatusById,
  handleprocessRegister,
  handleupdateUserById,
  handleupdateUserPasswordById,
  handleUserForgotPassword,
  handleUserResetPassword,
} from "../controllers/user.controller.js";
import Router from "express";
import upload from "../middlewares/uploadFile.js";
import {
  validateUpdateUserPassword,
  validateUserRegistration,
  validateUserForgotPassword,
  validateUserResetPassword,
} from "../validator/auth.js";
import { runValidation } from "../validator/index.js";
import {
  isAdmin,
  isLoggedIn,
  isLoggedOut,
  
} from "../middlewares/auth.js";

const userRouter = Router();


userRouter.post(
  "/process-register",
  isLoggedOut,
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  handleprocessRegister
);
userRouter.post("/activate",isLoggedOut, handleactiveUserAccount);
userRouter.get("/", isLoggedIn,isAdmin, handlegetUsers);
userRouter.get("/:id",isLoggedIn, handlegetUserById);
userRouter.put(
  "/reset-password/",
  validateUserResetPassword,
  runValidation,
  handleUserResetPassword
);
userRouter.put("/:id", isLoggedIn, upload.single("image"), handleupdateUserById);
userRouter.delete("/:id", isLoggedIn, handledeleteUserById);
userRouter.put("/manage-user-status/:id", isLoggedIn, isAdmin, handleUserStatusById);
userRouter.put("/update-password/:id", isLoggedIn, validateUpdateUserPassword, runValidation,  handleupdateUserPasswordById);
userRouter.post(
  "/forgot-password/",
  validateUserForgotPassword,
  runValidation,
  handleUserForgotPassword
);




export default userRouter;
