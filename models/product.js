const mongoose = require('mongoose');

 const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    none: {
        type: String,
        required: false
    },
    some: {
        type: String,
        required: false
    },
    enough: {
        type: String,
        required: false
    },

    date: {
        type: String,
        required:false
    },

    category: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: false
    }
 })

 const Product = mongoose.model('Product', productSchema);
 module.exports = Product;