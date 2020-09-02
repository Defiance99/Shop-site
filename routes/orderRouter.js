const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const orderControllers = require("../controllers/orderControllers.js");
const orderRouter = express.Router();

orderRouter.use(bodyParser.urlencoded({extended: true}));
orderRouter.use(bodyParser.json());

orderRouter.get("/myOrder", passport.authenticate('jwt', {session: false}), orderControllers.getMyOrder);
orderRouter.get("/checkout", passport.authenticate('jwt', {session: false}), orderControllers.checkout);
orderRouter.get("/history", passport.authenticate('jwt', {session: false}), orderControllers.history)
orderRouter.post("/addToOrder", passport.authenticate('jwt', {session: false}), orderControllers.addProductToOrder);
orderRouter.delete("/myOrder/:id", passport.authenticate('jwt', {session: false}), orderControllers.removeOrder);

module.exports = orderRouter