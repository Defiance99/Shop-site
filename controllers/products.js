const Product = require("../models/Product");
const jwtDecode = require('jwt-decode');

exports.createProduct = async function(request, response) {
    let token = request.headers.authorization;
    token = jwtDecode(token);

    const product = new Product({
        name: request.body.nameProduct,
        category: request.body.category,
        cost: +request.body.cost,
        image: request.file ? request.file.path : '',
        description: request.body.describe,
        userId: token.id
    });

    try {
        await product.save();
        response.status(201).json(product);
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }

}

exports.getMyProducts = async function(request, response) {
    let token = request.headers.authorization;
    token = jwtDecode(token);
    try {
        await Product.find({userId: token.id}, function(err, data) {
            if (data.length == 0) response.status(200).json(null);
            else response.status(200).json(data);
        });
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }

}

exports.getMyProductById = async function(request, response) {
    let productId = request.params.id;
    let token = request.headers.authorization;
    token = jwtDecode(token);
    
    try {
        await Product.findOne({$and: [{_id: productId}, {userId: token.id}]}, function(err, data) {
            response.status(200).json(data)
        });
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }

}

exports.productById = async function(request, response) {
    let productId = request.params.id;

    try {
        await Product.findOne({_id: productId}, function(err, data) {
            return response.status(200).json(data)
        });
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }
}

exports.productByCategory = async function(request, response) {
    let categoryProduct = request.params.category;
    
    try {
        await Product.find({category: categoryProduct}, function(err, data) {
            console.log(data)
            response.status(200).json(data)
        });
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }

}

exports.getProducts = async function(request, response) {
    try {
        await Product.find({}, function(err,data) {
            response.json(data)
        }).sort({ $natural: -1 }).limit(6);
        
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }
}

exports.getRandomProduct = function(request, response) {
    
}

