const express = require("express");
/* const hbs = require("hbs"); */
const cors = require("cors")
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser')
const app = express();
const productsRouter = require("./routes/productsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const orderRouter = require("./routes/orderRouter");



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb+srv://Defiance99:nSdJVQqBzFTS2WNs@cluster0.yi1n4.mongodb.net/users?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true})   // Новая версия требует кодирования: {useNewUrlParser: true}
    .then( () => console.log("Connected with mongo"))
    .catch( (err) => console.log("Error HERE: ", err));

    
    const passportStrategy = require("./middleware/passport");
app.use(passport.initialize());
passportStrategy.passportJwtStrategy(passport);


/* app.set("view engine", "hbs");
app.set("view engine", `${__dirname}/public/views`);
hbs.registerPartials(__dirname + "/public/views/partials");
app.use(express.static(__dirname + "/../public/views")); */

app.use('/uploads', express.static('uploads'));
app.use("/api/order", orderRouter);
app.use("/api/product", productsRouter);
app.use("/api/user", usersRouter);

app.listen(3000, () => console.log("Server started"));

module.exports.app = app;