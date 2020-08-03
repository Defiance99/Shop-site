const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport")
const userControllers = require("../controllers/userControllers");
const usersRouter = express.Router();

usersRouter.use(bodyParser.urlencoded({extended: true}));
/* usersRouter.use(bodyParser.json()); */

usersRouter.post("/register", userControllers.postFormRegister);
usersRouter.post("/login", userControllers.postLogin);
usersRouter.get("/favorites", passport.authenticate('jwt', {session: false}), userControllers.getMyFavorites);
usersRouter.get("/userInfo", passport.authenticate('jwt', {session: false}), userControllers.getUserInfo);
usersRouter.patch("/updateUserInfo", passport.authenticate('jwt', {session: false}), userControllers.updateUserInfo);

module.exports = usersRouter;


