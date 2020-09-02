const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const commentControllers = require("../controllers/commentControllers.js");
const commentRouter = express.Router();

commentRouter.use(bodyParser.urlencoded({extended: true}));
commentRouter.use(bodyParser.json());

commentRouter.post("/createComment", passport.authenticate('jwt', {session: false}), commentControllers.createComment);
commentRouter.get("/commentsByProductId/:id", passport.authenticate('jwt', {session: false}), commentControllers.getComments);

module.exports = commentRouter