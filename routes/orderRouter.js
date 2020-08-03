const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const orderControllers = require("../controllers/orderControllers.js");
const orderRouter = express.Router();

orderRouter.use(bodyParser.urlencoded({extended: true}));
orderRouter.use(bodyParser.json());
orderRouter.get("/myOrder", passport.authenticate('jwt', {session: false}), orderControllers.getMyOrder);
orderRouter.post("/addToOrder", passport.authenticate('jwt', {session: false}), orderControllers.addToOrder);
orderRouter.delete("/myOrder/:id", passport.authenticate('jwt', {session: false}), orderControllers.removeProduct);

module.exports = orderRouter