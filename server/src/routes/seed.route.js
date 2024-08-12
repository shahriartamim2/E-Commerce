import { Router } from "express";
import { seedProducts, seedUsers } from "../controllers/seed.controller.js";

const seedRouter = Router();

seedRouter.post("/seed/users", seedUsers);
seedRouter.post("/seed/products", seedProducts);

export default seedRouter;