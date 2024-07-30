import { errorHandler, successHandler } from "./responseHandler.controller.js";
import User from "../models/user.model.js";
import createError from "http-errors";
import mongoose from "mongoose";
import { findWithId } from "../services/findWithId.js";

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

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(id, options);
      
    if (!user) {
      return errorHandler(res, { statusCode: 404, message: "User not found" });
    } else {
      return successHandler(res, {
        statusCode: 200,
        message: "User found successfully",
        payload: {
          user
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser };
