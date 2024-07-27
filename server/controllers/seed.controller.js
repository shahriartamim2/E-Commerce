import User from "../models/user.model.js"
import data from "../src/data.js"
const seedUsers = async (req, res) => {
  try {
    await User.deleteMany({});  

    const users = await User.insertMany(data.users);
    res.json({ users });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        }
}

export { seedUsers };