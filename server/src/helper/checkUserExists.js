import User from "../models/user.model.js";
const checkUserExists = async (req, res, next) => {
  return await User.findOne({ email });
};

export default checkUserExists;
