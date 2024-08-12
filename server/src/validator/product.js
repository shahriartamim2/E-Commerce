import { body } from "express-validator";

const validateCreateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name must be between 3 to 31 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 3, max: 500 })
    .withMessage("Description must be between 3 to 500 characters"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),
  body("sold").trim().isNumeric().withMessage("Sold must be a number"),
  body("shipping").trim().isNumeric().withMessage("Shipping must be a number"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Category must be a valid MongoID"),
  body("image").custom((value, { req }) => {
    if (req.file) {
      return true;
    }
    throw new Error("Image is required");
  }),
];


export { validateCreateProduct };