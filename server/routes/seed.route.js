import { Router } from "express";
import { seedUsers } from "../controllers/seed.controller.js";

const seedRouter = Router();

seedRouter.get("/users", seedUsers);

export default seedRouter;