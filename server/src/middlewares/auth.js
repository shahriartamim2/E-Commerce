import CreateError from 'http-errors';
import jwt from 'jsonwebtoken';
import { jwtAccessKey } from '../secret.js';

const isLoggedIn = async (req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
          throw CreateError(401, "Access token not found. Please Login first");
        }
        // verify token
        const decoded = jwt.verify(accessToken, jwtAccessKey);
        if (!decoded) {
          throw CreateError(401, "Invalid token. Please login first");
        }
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        next(error);
        
    }
}
const isLoggedOut = async (req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, jwtAccessKey);
                if(decoded){
                    throw CreateError(401, "You are already logged in");
                }
            } catch (error) {
                throw error;
            }

        }
        next();
    } catch (error) {
        next(error);
        
    }
}

export {isLoggedIn, isLoggedOut};