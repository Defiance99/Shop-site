const mongoose = require('mongoose');
const { model } = require('./User');
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("Categories", categorySchema);