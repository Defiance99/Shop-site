const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode');
const User = require("../models/User");
const keys = require("../config/keys")

exports.postFormRegister = async function(req,res) {

        const userInfo =  await User.findOne({login: req.body.login});

        if (userInfo) {
            res.status(409).json({
                message: `Login exist: ${req.body.login}`
            });
        }else {

            const salt =  await bcryptjs.genSaltSync(10); 
            
            const user =  new User({
                name: req.body.name,
                login: req.body.login,
                password: bcryptjs.hashSync(req.body.password, salt)
            });

        
            user.save( (err) => {
                if (err) return console.log(err);
                res.status(200).json({
                    message: "Успешно зареган"
                })
            });
        }
    
}

 exports.postLogin = async function(req,res) { 

    const userInfo = await User.findOne({login: req.body.login});


    if (userInfo) {
        const resultOfCheckingPasswords = await bcryptjs.compareSync(req.body.password, userInfo.password);

        if (resultOfCheckingPasswords) { 

            const token = jwt.sign({
                login: userInfo.login,
                id: userInfo._id,
            }, keys.jwt, {expiresIn: 60 * 60});
            
            res.status(200).json({
                token: `Bearer ${token}`
            });

        }else {
            res.status(401).json({
                message: "Пароль не верен" 
            });
        }

    }else {
        res.status(404).json({
            message: "Имя не найдено"
        });
    }

}

exports.getMyFavorites = function(req,res) {
    
}

exports.getUserInfo = async function(req, res) {
    let token = req.headers.authorization;
    token = jwtDecode(token);

    try {
        await User.find({_id: token.id}, function(err, data) {
            res.status(200).json(data)
        });
    } catch(e) {
        res.status(500).json({
            success: false,
            message: error.message ? error.message : error
          })
    }
}   

exports.updateUserInfo = async function(req, res) {
    
    const salt =  await bcryptjs.genSaltSync(10); 
    const password = await bcryptjs.hashSync(req.body.password, salt)

    try {
        await User.update(
            {_id: req.user._id},
            {"name": req.body.name, "login": req.body.login, "password": password},
            {upsert: false},
            function(err, data) {
                res.status(204).json(data);
            });
    } catch(err) {
        res.status(500).json({
            message: "Попробуйте позже"
          })
    }
}