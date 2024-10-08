import express from "express";
import createError from "http-errors";
import xssClean from "xss-clean";
import { rateLimit } from "express-rate-limit";
import seedRouter from "../src/routes/seed.route.js";
import userRouter from "../src/routes/user.route.js";
import { errorHandler } from "../src/controllers/responseHandler.controller.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 1 minutes",
});

const corsOptions = {
  origin: true, // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept',
    'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true, // Allows cookies and credentials
};



app.use(morgan("dev"));
app.use(cookieParser());
app.use(rateLimiter);
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors(corsOptions));


app.use("/api/", seedRouter);
app.use("/api/users",userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);


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
