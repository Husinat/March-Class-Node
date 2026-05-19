const { body } = require ('express-validator');

const registerValidator = [
    // Name
    body('name')
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min:2, max: 50})
    .withMessage("Name must be between 2 and 50 characters")
    .escape(),


    // Email
    body('email')
    .isEmail()
    .withMessage("Please use a valikd email address")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(),

    // Password
    body('password')
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
    })
    .withMessage("Password must be at least 8 characters long and contain at least one lowercase, one uppercase, one number, and one symbol")
    .notEmpty().withMessage("Password is required"),




    // Age
    // body('age')
    // .exists()
    // .withMessage("Age is required")
    // .isNumeric()
    // .withMessage("Age must be a number")
    // .isInt({min : 18, max: 50})
    // .withMessage("Age must be between 18 and 20")
    // .toInt(),


    // Gender
    // body('gender')
    // .trim()
    // .isIn(['male', 'female', 'other', 'prefer-not-to-say'])
    // .withMessage('Please select a valid gender option')
    // .optional()

];








// LOGIN VALIDATION
const loginValidator = [
    // email
     body('email')
    .isEmail()
    .withMessage("Please use a valid Email Address")
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail(),
    
    // password
    body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
];


module.exports = { registerValidator, loginValidator }