const Order = require("../models/Order");
const { response } = require("express");

exports.getMyOrder = async function(req,res) {
    
    try {
        await Order.find({userId: req.user._id}, function(err, data) {
            res.status(200).json(data);
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }

}

exports.addToOrder = async function(req, res) {

    try {
        await Order.update(
            {$and: [{userId: req.user._id}, {completed: false}]},
            {$addToSet: {'list': {
                "productId": req.body.productId,
                "name": req.body.name, 
                "cost": req.body.cost,
                "description": req.body.description
            }}},
            {upsert: true},
            function(err,data) {
                res.status(201).json({
                    message: "Успешно добавлено"
                })
            }
        )
    }catch(error) {
        res.status(500).json({
            message: error.message ? error.message : error
          })
    }
}

exports.removeProduct = async function(req,res) {
    let productId = req.params.id;

    try {
        await Order.update(
            {$and: [{"userId": req.user._id}, {"completed": false}]}, 
            {$pull: {"list[0].productId": productId}},
            function(err, data) {
                if (data.length == 0) res.status(200).json(null);
                else res.status(200).json(data);
        });
    }catch(error) {
        res.status(500).json({message: "Повторите позже"})
    }

}