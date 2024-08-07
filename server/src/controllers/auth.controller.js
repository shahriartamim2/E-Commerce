import createError from "http-errors";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { successHandler } from "./responseHandler.controller.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../helper/jsonwebtoken.js";
import { jwtAccessKey } from "../secret.js";

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user exists with this emails  
    const user = await User.findOne({ email: email });
    if(!user){
        throw createError(404,'User does not exists with this email. Please login first');
    }
    //compare password
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        throw createError(400,'Invalid credentials');
    }
    // check isBanned or not

    if(user.isBanned){
        throw createError(403, 'You are banned from the system. Please contact admin');
    }

    // jwt token in cookis 
    const accessToken = generateToken({email}, jwtAccessKey, '15m');

    res.cookie('access_token', accessToken, {
        maxAge: 15*60*1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });


    return successHandler(res, {
      statusCode: 200,
      message: "Succesfully logged in",
      payload: {
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          isBanned: user.isBanned,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export { userLogin };
