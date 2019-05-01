const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Person = mongoose.model('Computers');
const key = require('../setup/myurl');
var cookieExtractor = function(req){
    var token = null;
    if(req && req.cookies)
    token = req.cookies['jwt'];
    return token;
}
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = key.secret;

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        Person.findById(jwt_payload.id)
        .then(person =>{
            if(person){
                return done(null, person);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
    }))
}