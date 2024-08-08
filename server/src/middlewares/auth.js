import CreateError from 'http-errors';
import jwt from 'jsonwebtoken';
import { jwtAccessKey } from '../secret.js';

const isLoggedIn = async (req,res,next)=>{
    try {
        const token = req.cookies.accessToken;
        if(!token){
            throw CreateError(401, "Access token not found. Please Login first");
        }
        // verify token
        const decoded = jwt.verify(token, jwtAccessKey);
        if (!decoded) {
          throw CreateError(401, "Invalid token. Please login first");
        }
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        next(error);
        
    }
}

export {isLoggedIn};