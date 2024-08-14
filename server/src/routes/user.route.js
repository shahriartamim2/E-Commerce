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
import uploadImage from "../middlewares/uploadFile.js";

const userRouter = Router();


userRouter.post(
  "/process-register",
  isLoggedOut,
  uploadImage.single("image"),
  validateUserRegistration,
  runValidation,
  handleprocessRegister
);
userRouter.post("/activate",isLoggedOut, handleactiveUserAccount);
userRouter.get("/", isLoggedIn,isAdmin, handlegetUsers);
userRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, handlegetUserById);
userRouter.put(
  "/reset-password/",
  validateUserResetPassword,
  runValidation,
  handleUserResetPassword
);
userRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, uploadImage.single("image"), handleupdateUserById);
userRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, handledeleteUserById);
userRouter.put(
  "/manage-user-status/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleUserStatusById
);
userRouter.put(
  "/update-password/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  validateUpdateUserPassword,
  runValidation,
  handleupdateUserPasswordById
);
userRouter.post(
  "/forgot-password/",
  validateUserForgotPassword,
  runValidation,
  handleUserForgotPassword
);




export default userRouter;
