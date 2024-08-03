import { validationResult } from "express-validator";
import { errorHandler } from "../controllers/responseHandler.controller.js";

const runValidation = (req,res,next)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return errorHandler(res, {statusCode:422, message: error.array()[0].msg})
        }
        return next();
    } catch (error) {
        next(error);
    }
}

export  {runValidation};