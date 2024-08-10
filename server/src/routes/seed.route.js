import { Router } from "express";
import { seedUsers } from "../controllers/seed.controller.js";

const seedRouter = Router();

seedRouter.post("/seed/users", seedUsers);

export default seedRouter;