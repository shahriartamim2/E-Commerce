// registration validation
import { body } from "express-validator";

const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name must be between 3 to 31 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone must be 11 characters"),
  body('image')
    .custom((value, { req }) => {
      if (req.file) {
        return true;
      }
      throw new Error('Image is required');
    }), 
    
];

export { validateUserRegistration };