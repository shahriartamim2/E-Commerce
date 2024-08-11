
import Router from "express";
import { handleLogin, handleLogout, handleProtectedRoute, handleRefreshToken } from "../controllers/auth.controller.js";
import { isLoggedIn, isLoggedOut } from "../middlewares/auth.js";
import { validateUserLogin } from "../validator/auth.js";
import { runValidation } from "../validator/index.js";


const authRouter = Router();

authRouter.post("/login", validateUserLogin, runValidation, isLoggedOut, handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout);
authRouter.get("/refresh-token",handleRefreshToken);
authRouter.get("/protected",handleProtectedRoute);

export default authRouter;
