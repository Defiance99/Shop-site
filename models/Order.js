const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderShema = new Schema({
    list: [
        {
            name: String,
            cost: Number,
            description: String,
            productId: String
        }
    ],
    userId: {
        type: String,
        required: true
        /* ref: 'User',
        type: Schema.Types.ObjectId */
    },
    completed: {
        type: Boolean
    },
    orderPrice: Number,
    orderNumber: Number,
    date: Date
});


module.exports = mongoose.model("Orders", orderShema);

