import { errorHandler, successHandler } from "./responseHandler.controller.js";
import User from "../models/user.model.js";
import createError from "http-errors";
import { findWithId } from "../services/findWithId.js";
import deleteImage from "../../src/helper/deleteImage.js";
import { generateToken } from "../../src/helper/jsonwebtoken.js";
import sendEmailWithNodeMailer from "../../src/helper/email.js";
import jwt from "jsonwebtoken";
import { clientUrl, jwtActivationKey, jwtPasswordResetKey } from "../secret.js";
import manageUserStatus from "../services/manageUserStatus.js";
import {
  deleteUserWithId,
  findUser,
  findUserWithId,
  forgotPasswordWithEmail,
  resetPassword,
  updateUserPassword,
  updateUserWithId,
} from "../services/userService.js";
import checkUserExists from "../helper/checkUserExists.js";
import sendEmail from "../helper/sendEmail.js";
import { uploadCloudinaryImage } from "../helper/cloudinaryImage.js";

const handleprocessRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    let image = req.file;

    const userExists = await checkUserExists(email);
    if (userExists) {
      throw createError(409, "User already exists. Please login");
    }

    const folderName = "Ecommerce/users";
    const model = "User";
    if (image) {
      const imageUrl = await uploadCloudinaryImage(req, folderName, model);
      image = imageUrl;
    }

    const token = generateToken(
      { name, email, password, phone, address, image },
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

    await sendEmail(emailData);

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

const handleactiveUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) throw createError(400, "Token not found");

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(400, "Unable to verify user");
      console.log(decoded);

      const userExists = await User.findOne({ email: decoded.email });
      if (userExists) {
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
        throw createError(
          400,
          "Something went wrong. Unable to verify user. Please register again"
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

const handlegetUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const { count, users, pagination } = await findUser(search, page, limit);

    return successHandler(res, {
      statusCode: 200,
      message: "Users retrieved successfully",
      payload: {
        found: count,
        users: users,
        pagination: pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handlegetUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findUserWithId(id, options);

    return successHandler(res, {
      statusCode: 200,
      message: "User found successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handledeleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    await deleteUserWithId(id, options);
    return successHandler(res, {
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleupdateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const updatedUser = await updateUserWithId(id, options, req);

    return successHandler(res, {
      statusCode: 200,
      message: "User updated successfully",
      payload: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleUserStatusById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const action = req.body.action;

    const updatedStatus = await manageUserStatus(id, action, next);

    return successHandler(res, {
      statusCode: 200,
      message: updatedStatus.successMessage,
      payload: {
        bannedUser: updatedStatus.userStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleupdateUserPasswordById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updatedUser = await updateUserPassword(id, req);

    return successHandler(res, {
      statusCode: 200,
      message: "User password was changed successfully",
      payload: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleUserForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const token = await forgotPasswordWithEmail(email);

    return successHandler(res, {
      statusCode: 200,
      message: `Please check your ${email} to activate your account`,
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleUserResetPassword = async (req, res, next) => {
  try {
    const { password, token } = req.body;

    await resetPassword(token, password);

    return successHandler(res, {
      statusCode: 200,
      message: "User password was reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  handlegetUsers,
  handlegetUserById,
  handledeleteUserById,
  handleprocessRegister,
  handleactiveUserAccount,
  handleupdateUserById,
  handleUserStatusById,
  handleupdateUserPasswordById,
  handleUserForgotPassword,
  handleUserResetPassword,
};
