const express = require("express");
const passport = require("passport");
const upload = require("../middleware/upload");
const products = require("../controllers/products.js");
const productsRouter = express.Router();


productsRouter.post("/createProducts", passport.authenticate('jwt', {session: false}), upload.single("image"), products.createProduct);
productsRouter.get("/myProducts", passport.authenticate('jwt', {session: false}), products.getMyProducts);
productsRouter.get("/myProduct/:id", passport.authenticate('jwt', {session: false}), products.getMyProductById);
productsRouter.get("/getProducts", products.getProducts);
productsRouter.get("/productByCategory/:category", products.productByCategory);
productsRouter.get("/randomProduct", passport.authenticate('jwt', {session: false}), products.getRandomProduct);
productsRouter.get("/:id", passport.authenticate('jwt', {session: false}), products.productById);
productsRouter.delete("/:id", passport.authenticate('jwt', {session: false}), products.removeProduct);

module.exports = productsRouter;