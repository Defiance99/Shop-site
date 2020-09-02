const Comment = require("../models/Comment");

exports.createComment = async function(request, response) {
    const form = request.body.form;
    const productId = request.body.productId;
    const stars = request.body.stars

    try {
        /* await Comment.find({}, function(err,data) {response.status(200).json(data)}) */
        await Comment.updateOne(
            {"productId": productId},
            {
                $addToSet: {'comments': {
                    "stars": stars,
                    "advantages": form.advantages, 
                    "weaknesses": form.weaknesses,
                    "comment": form.comment,
                    "name": form.name
                    }
                }
            },
            {upsert: true},
            function(err, data) {
                response.status(200).json({message: "Отзыв оставлен"});
            }
        );
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }
}

exports.getComments = async function(request, response) {
    let productId = request.params.id

    try {
        await Comment.find(
            {"productId": productId},
            {comments: true},
            function(err,data) {
                response.status(200).json(data);
            }
        );
    }catch(error) {
        response.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }
}