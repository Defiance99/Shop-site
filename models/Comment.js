const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentShema = new Schema({
    productId: String,
    comments: [
        {   
            stars: Number,
            advantages: String,
            weaknesses: String,
            comment: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ]

});


module.exports = mongoose.model("Comments", commentShema);

