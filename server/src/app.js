import express from "express";
import createError from "http-errors";
import xssClean from "xss-clean";
import { rateLimit } from "express-rate-limit";
import seedRouter from "../src/routes/seed.route.js";
import userRouter from "../src/routes/user.route.js";
import { errorHandler } from "../src/controllers/responseHandler.controller.js";

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 6,
  message: "Too many requests from this IP, please try again after 2 minutes",
});

app.use(rateLimiter);
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/", seedRouter);
app.use("/api/",userRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  next(createError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  
  errorHandler(res, {statusCode: err.status, message: err.message })
});

export default app;
