const { body } = require('express-validator');

const addProductValidator = [

    // Title
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .isLength({ min: 2, max: 100 })
        .withMessage("Title must be between 2 and 100 characters")
        .escape(),

    // Description
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters")
        .escape(),

    // Price
    body('price')
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ gt: 100 })
        .withMessage("Price must be a number greater than 100")
        .toFloat(),

    // Category
    body('category')
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .isIn(['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Grocery', 'Other'])
        .withMessage("Invalid category"),

    // Image
    // body('image')
    //     .notEmpty()
    //     .withMessage("Image URL is required")
    //     .isURL()
    //     .withMessage("Image must be a valid URL")
];

module.exports = { addProductValidator };