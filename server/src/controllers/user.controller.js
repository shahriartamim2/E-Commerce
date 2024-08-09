import { errorHandler, successHandler } from "./responseHandler.controller.js";
import User from "../models/user.model.js";
import createError from "http-errors";
import { findWithId } from "../services/findWithId.js";
import  deleteImage from "../../src/helper/deleteImage.js";
import { generateToken } from "../../src/helper/jsonwebtoken.js";
import sendEmailWithNodeMailer from "../../src/helper/email.js";
import jwt from "jsonwebtoken";
import { clientUrl, jwtActivationKey } from "../secret.js";

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();

    if (count === 0) {
      return errorHandler(res, { statusCode: 404, message: "Users not found" });
    } else {
      return successHandler(res, {
        statusCode: 200,
        message: "Users retrieved successfully",
        payload: {
          found: count,
          data: users,
          pagination: {
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
          },
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    // const id = req.params.id;
    const id = req.body.user.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    if (!user) {
      return errorHandler(res, { statusCode: 404, message: "User not found" });
    } else {
      return successHandler(res, {
        statusCode: 200,
        message: "User found successfully",
        payload: {
          user,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    return successHandler(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const imageBufferString = req.file.buffer.toString("base64");

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw createError(409, "User already exists. Please login");
    }

    const token = generateToken(
      { name, email, password, phone, address, image : imageBufferString },
      jwtActivationKey,
      "20m"
    );

    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
      <h2>Hello ${name}</h2>
      <p>Please click the link below to <a href="${clientUrl}/api/users/activate/${token}">activate your account</a></p>
      `,
    };

    try {
      // await sendEmailWithNodeMailer(emailData);
      console.log("Email sent");
    } catch (error) {
      throw createError(500, "Email not sent");
    }

    return successHandler(res, {
      statusCode: 200,
      message: `Please check your ${emailData.email} to activate your account`,
      payload: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const activeUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) throw createError(400, "Token not found");

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(400, "Unable to verify user");
      console.log(decoded);

      const userExists = await User.findOne({ email: decoded.email });
      if(userExists){
        throw createError(409, "User already exists. Please login");
      }

      await User.create(decoded);

      return successHandler(res, {
        statusCode: 201,
        message: "User account registered successfully",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has Expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid Token");
      } else {
        throw createError(400, "Something went wrong. Unable to verify user. Please register again");
      }
    }
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateOptions = {new:true, runValidations:true, context:'query'};
    const options = { password: 0 };
    await findWithId(User, id, options);

    let updates = {};

    for(let key in req.body){
      if(['name','password','phone','address'].includes(key)){
        updates[key] = req.body[key];
      }
    }

    const image = req.file;
    if(image){
      if (image.mimetype !== "image/png" && image.mimetype !== "image/jpeg") {
        throw createError(400, "Please upload an image of type PNG or JPEG");
      }
      if (image.size > 5 * 1024 * 1024) {
        throw createError(400, "Image size should not exceed 5MB");
      }
      updates.image = image.buffer.toString("base64");
    }
    else{
      throw createError(400, "Please upload an image");
    }
    
    const updatedUser = await User.findByIdAndUpdate(id, updates, updateOptions).select('-password');

    return successHandler(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload:{
        updatedUser
      }
    });
  } catch (error) {
    next(error);
  }
};

const banUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateOptions = {new:true, runValidations:true, context:'query'};
    await findWithId(User, id);

    const updates = {isBanned: true};

    const bannedUser = await User.findByIdAndUpdate(id, updates, updateOptions).select('-password');

    return successHandler(res, {
      statusCode: 200,
      message: "User was banned successfully",
      payload: {
        bannedUser: bannedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const unbanUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateOptions = {new:true, runValidations:true, context:'query'};
    await findWithId(User, id);

    const updates = {isBanned: false};

    const unbannedUser = await User.findByIdAndUpdate(id, updates, updateOptions).select('-password');

    return successHandler(res, {
      statusCode: 200,
      message: "User was unBanned successfully",
      payload: {
        bannedUser: unbannedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  activeUserAccount,
  updateUserById,
  banUserById,
  unbanUserById,
};
