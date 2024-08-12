import User from "../models/user.model.js"
import data from "../data.js"
import Product from "../models/product.model.js";
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
const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});  

    const products = await Product.insertMany(data.products);
    res.json({ products });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        }
}

export { seedUsers, seedProducts };