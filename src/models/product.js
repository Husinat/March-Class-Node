const mongoose = require("mongoose");

// Creating a Schema for the product
const productSchema = new mongoose.Schema({
    title:{
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must have at least 3 characters"],
    maxlength: [100, "Title must not be more than 100 characters"], 
    trim: true,

    },
    description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [12, "Description must have at least 12 characters"],
    maxlength: [300, "Description must not be more than 300 characters"],
    trim: true, 

    },
    price:{
    type: Number,
    required: true,
    min: [100, "Price must be 100 upward"]

    },
    category: {
    type: String,
    required: true,

    },
    image: {
    type: String,
    required: true

    },
    publicId:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('product', productSchema);