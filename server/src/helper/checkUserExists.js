import User from "../models/user.model.js";
const checkUserExists = async (email) => {
  return await User.findOne({ email });
};

export default checkUserExists;
