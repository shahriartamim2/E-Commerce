import deleteImage from "../helper/deleteImage.js";
import User from "../models/user.model.js";
import { findWithId } from "./findWithId.js";
import createError from "http-errors";

const findUser = async (search, page, limit) => {
  try {
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
      return errorHandler(res, {
        statusCode: 404,
        message: "Users not found",
      });
    }
    const pagination = {
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            previousPage: page - 1 > 0 ? page - 1 : null,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
          };

    return{
        users, count, pagination
    }
  } catch (error) {
    next(error);
  }
};

const findUserWithId  = async (id, options)=>{
    try {
        const users = await User.findById(id, options);
        if (!users) {
            return errorHandler(res, {
                statusCode: 404,
                message: "User not found",
            });
        }
        return users;
    } catch (error) {
        throw error;
    }
}

const deleteUserWithId  = async (id, options)=>{
    try {
        const user = await findWithId(User, id, options);
        if (!user) {
            return errorHandler(res, {
                statusCode: 404,
                message: "User not found with this id",
            });
        }
        const userImagePath = user.image;
        deleteImage(userImagePath);

        await User.findByIdAndDelete({ _id: id, isAdmin: false });

    } catch (error) {
        throw error;
    }
}

const updateUserWithId  = async (id, options, req)=>{
    try {
        const updateOptions = {
          new: true,
          runValidations: true,
          context: "query",
        };
        await findWithId(User, id, options);

        let updates = {};

        for (let key in req.body) {
          if (["name", "password", "phone", "address"].includes(key)) {
            updates[key] = req.body[key];
          }
        }

        const image = req.file;
        if (image) {
          if (
            image.mimetype !== "image/png" &&
            image.mimetype !== "image/jpeg" &&
            image.mimetype !== "image/jpg"
          ) {
            throw createError(
              400,
              "Please upload an image of type PNG or JPEG or JPG"
            );
          }
          if (image.size > 5 * 1024 * 1024) {
            throw createError(400, "Image size should not exceed 5MB");
          }
          updates.image = image.buffer.toString("base64");
        }

        const updatedUser = await User.findByIdAndUpdate(
          id,
          updates,
          updateOptions
        ).select("-password");

        return updatedUser;

    } catch (error) {
        throw error;
    }
}

export { findUser, findUserWithId, deleteUserWithId, updateUserWithId };