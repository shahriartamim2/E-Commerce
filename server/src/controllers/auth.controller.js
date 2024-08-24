import createError from "http-errors";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { successHandler } from "./responseHandler.controller.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../helper/jsonwebtoken.js";
import { jwtAccessKey, jwtRefreshKey } from "../secret.js";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../helper/cookie.js";

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user exists with this emails
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError(
        404,
        "User does not exists with this email. Please register first"
      );
    }
    //compare password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw createError(400, "Invalid credentials");
    }
    // check isBanned or not

    if (user.isBanned) {
      throw createError(
        403,
        "You are banned from the system. Please contact admin"
      );
    }

    // geneerate jwt token and save in in cookis
    // image in token makes the token too large so we will not include image in token
    const infoInToken = {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned
    };
    const accessToken = generateToken(infoInToken, jwtAccessKey, "5m");
    setAccessTokenCookie(res, accessToken);

    const refreshToken = generateToken(infoInToken, jwtRefreshKey, "7d");
    setRefreshTokenCookie(res, refreshToken);

    const userInfo = user.toObject();
    delete userInfo.password;

    return successHandler(res, {
      statusCode: 200,
      message: "User logged in Succesfully",
      payload: { user: userInfo },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return successHandler(res, {
      statusCode: 200,
      message: "User logged out Succesfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) {
      throw createError(403, "No refresh token found. Please login again");
    }
    const decoded = jwt.verify(oldRefreshToken, jwtRefreshKey);
    if (!decoded) {
      throw createError(403, "Invalid Token. Please login again");
    }

    const userInToken = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
      isBanned: decoded.isBanned,
    };

    const accessToken = generateToken(userInToken, jwtAccessKey, "5m");
    setAccessTokenCookie(res, accessToken);

    return successHandler(res, {
      statusCode: 200,
      message: "Access token generated Succesfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const oldAccessToken = req.cookies.accessToken;
    if (!oldAccessToken) {
      throw createError(403, "Access Denied. No token found");
    }
    const decoded = jwt.verify(oldAccessToken, jwtAccessKey);
    if (!decoded) {
      throw createError(403, "Invalid Token. Please login again");
    }

    return successHandler(res, {
      statusCode: 200,
      message: "Protected route accessed Succesfully",
    });
  } catch (error) {
    next(error);
  }
};

export { handleLogin, handleLogout, handleRefreshToken, handleProtectedRoute };
