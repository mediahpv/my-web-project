// backend/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a non-negative number']
    },
    image: {
        type: String, // URL to the product image
        required: [true, 'Product image is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    brand: {
        type: String,
        required: false
    },
    sizes: {
        type: [String], // Array of available sizes
        required: false
    },
    colors: {
        type: [String], // Array of available colors
        required: false
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    discount: {
      type: Number,
      default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;