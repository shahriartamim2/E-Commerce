
import Router from "express";
import { userLogin } from "../controllers/auth.controller.js";


const authRouter = Router();

authRouter.post("/login", userLogin);

export default authRouter;
