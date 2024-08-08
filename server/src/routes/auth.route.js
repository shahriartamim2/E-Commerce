
import Router from "express";
import { handleLogin, handleLogout } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

export default authRouter;
