const passportJwt = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("Users")      //const User = require("../models/User");                                    
const keys = require("../config/keys")

const JwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

exports.passportJwtStrategy = function(passport) {
    passport.use(
        new JwtStrategy(options, async (playload, done) => { 
        try {
            const user = await (await User.findById(playload.id).select('login id'));
            
            if (user) {
                done(null, user);
            }else {
                done(null, false);
            }  
        }catch(err) {
            console.log(err);
        }
        
    }));
}



