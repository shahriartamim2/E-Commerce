
import Router from "express";
import { handleLogin, handleLogout } from "../controllers/auth.controller.js";
import { isLoggedIn, isLoggedOut } from "../middlewares/auth.js";


const authRouter = Router();

authRouter.post("/login",isLoggedOut, handleLogin);
authRouter.post("/logout",isLoggedIn, handleLogout);

export default authRouter;
