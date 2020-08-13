const express = require("express");
/* const hbs = require("hbs"); */
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require("./config/keys");
const productsRouter = require("./routes/productsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const orderRouter = require("./routes/orderRouter");
const port = process.env.PORT || 3000

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(keys.mongoURI, 
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


if (procces.env.NODE_ENV === "production") {
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

app.listen(port, () => console.log(`Server started on ported: ${port}`));

module.exports.app = app;