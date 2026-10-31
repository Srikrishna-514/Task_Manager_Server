const { body, validationResult, header } = require("express-validator");

const signinValidation = [
  // Name validation

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be 3-30 characters"),

  // Username validation
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3–30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can contain letters, numbers, and underscores only"),

  // Email validation
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email")
    .bail()
    .isLength({ max: 40 })
    .withMessage("Email must not exceed 40 characters")
    .normalizeEmail(),

  // Password validation
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 25 })
    .withMessage("Password must be 8–25 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),

  // Return validation errors
  (req, res, next) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      const err = {
        statusCode: 400,
        errors: results.errors,
        message: "signin validation error",
      };
      next(err);
    }

    next();
  },
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email")
    .bail()
    .isLength({ max: 40 })
    .withMessage("Email must not exceed 40 characters")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 25 })
    .withMessage("Password must be 8–25 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),

  (req, res, next) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      // const err = {
      //   message: "login validation error",
      //   statusCode: 400,
      //   error: results.errors,
      // };
      const err = {
        statusCode: 400,
        errors: results.errors,
        message: "login validation error",
      };
      next(err);
    }
    next();
  },
];

const tokenValidation = [
  header("Authorization").isString().withMessage("Autherization token require"),
];
const validationMiddleware = (req, res, next) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    const err = {
      statusCode: 400,
      errors: results.errors,
      message: "login validation error",
    };
    next(err);
  }
  next();
};

const editValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be 3-30 characters"),

  // Username validation
  body("username")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3–30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can contain letters, numbers, and underscores only"),

  // Email validation
  body("email")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email")
    .bail()
    .isLength({ max: 40 })
    .withMessage("Email must not exceed 40 characters")
    .normalizeEmail(),

  // Password validation
  body("password")
    .optional()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 25 })
    .withMessage("Password must be 8–25 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),

  // Return validation errors
  (req, res, next) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      const err = {
        statusCode: 400,
        errors: results.errors,
        message: "edit validation error",
      };
      next(err);
    }

    next();
  },
];

module.exports = {
  signinValidation,
  loginValidation,
  tokenValidation,
  editValidation,
  validationMiddleware,
};
