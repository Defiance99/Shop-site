const Order = require("../models/Order");

exports.getMyOrder = async function(req,res) {
    
    try {
        await Order.find(
            {$and: [{userId: req.user._id}, {completed: false}]}, 
            function(err, data) {
                if (data.length != 0 && data[0].list.length > 0) res.status(200).json(data);
                else res.status(200).json(null);
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }

}

exports.addProductToOrder = async function(req, res) {


    try {
        await Order.update(
            {$and: [{userId: req.user._id}, {completed: false}]},
            {  
                $addToSet: {'list': {
                    "productId": req.body.productId,
                    "name": req.body.name, 
                    "cost": req.body.cost,
                    "description": req.body.description
                } 
            }},
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

exports.removeOrder = async function(req,res) {

    try {
        await Order.update(
            {$and: [{"userId": req.user._id}, {"completed": false}]}, 
            {$pull: {"list": {"_id": req.params.id}}},
            {multi: false},
            function(err, data) {
                res.status(200).json({message: "Удалено"});
            }
        );
        
    }catch(err) {
        res.status(500).json({message: err.message});
    }

}

exports.checkout = async function(req, res) {
    const price = +req.query.orderPrice;
    

    try {
        let countDoc = await Order.find({completed: true}).count();
        
        await Order.update(
            {$and: [{userId: req.user._id}, {completed: false}]},
            {
                "completed": true, 
                "orderNumber": countDoc + 1,
                "orderPrice": price,
                $currentDate: {
                    lastModified: true,
                    "date": Date.now
                }
            },
            function(err, data) {
                res.status(200).json({
                    message: "Оплачено"
                })
            }
        );
    }catch(err) {
        res.status(500).json({
            message: err.message ? err.message : err
            })
    }
}

exports.history = async function(req, res) {
    /* Order.find({}, function(err, data) {
        res.status(200).json(data)
    }) */
    try {
        Order.find({userId: req.user._id, completed: true}, 
            function(err, data) {
                res.status(200).json(data)
        })
    }catch(err) {
        res.status(500).json({
            message: error.message ? error.message : error
          })
    }   

}