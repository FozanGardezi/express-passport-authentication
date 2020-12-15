const express = require('express');
var crypto = require('crypto');
var passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require( '../models/index');
var {forgotPasswordEmail, recieveNewPassword} =  require('../controllers/email');
var {signup, signin} = require('../controllers/user');

const fs = require('fs');
const path = require('path');


const pathToKey = path.join(__dirname, '..', 'id_rsa256_priv.key');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const path_To_Key = path.join(__dirname, '..', 'id_rsa256_pub.key');
const PUB_KEY = fs.readFileSync(path_To_Key, 'utf8');

const router = express.Router();


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = PRIV_KEY;
opts.algorithms = ['RS256'];

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            console.log(err);
            return done(err, false);
        }
        if (user) {
            console.log(user);
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


router.post('/register', signup);

router.post('/login', signin);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

router.post('/forgot-password', forgotPasswordEmail);

router.post('/reset-password/:userId/:token', recieveNewPassword);

router.get('/', passport.authenticate('jwt', { session: false}), (req, res, next) => {
  res.status(200).json({ success: true, msg: "If successful then auhenticated"});
})


module.exports = router