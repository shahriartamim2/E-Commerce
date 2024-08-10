import User from "../models/user.model.js";


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

export { findUser };