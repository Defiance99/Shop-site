const mongoose = require('mongoose');
const { model } = require('./User');
const Schema = mongoose.Schema

const productShema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        /* ref: 'Category', */
        /* type: Schema.Types.ObjectId */
    },
    cost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String
    },
    userId: {
        type: String
        /* ref: 'User',
        type: Schema.Types.ObjectId */
    }
});

module.exports = mongoose.model("Products", productShema);