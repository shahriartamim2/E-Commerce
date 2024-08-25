
import Router from "express";
import { handleAuthCheck, handleLogin, handleLogout, handleProtectedRoute, handleRefreshToken } from "../controllers/auth.controller.js";
import { isLoggedIn, isLoggedOut } from "../middlewares/auth.js";
import { validateUserLogin } from "../validator/auth.js";
import { runValidation } from "../validator/index.js";


const authRouter = Router();

authRouter.post("/login", validateUserLogin, runValidation, isLoggedOut, handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout);
authRouter.post("/refresh-token",handleRefreshToken);
authRouter.get("/protected",handleProtectedRoute);
authRouter.get("/check",handleAuthCheck);


export default authRouter;
