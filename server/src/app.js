import express from "express";
import  createError from "http-errors";
import xssClean from "xss-clean";
import { rateLimit } from "express-rate-limit";


const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes into mili second
  max: 6, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests from this IP, please try again after 5 minutes",
 
});

// Apply the rate limiting middleware to all requests.

app.use(rateLimiter);
app.use(xssClean());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//create a client error handler
app.use((req, res, next) => {
    next(createError(404, "Page not found"));
});

//create a server error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Internal server error",
    })
});


export default app