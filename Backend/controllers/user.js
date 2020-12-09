const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');
var crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '..', 'id_rsa256_priv.key');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidPassword(password) {
    //re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (password.length >= 8 )  {
      return true;
    }
    return false;
}

function validPassword(password, salt, hash) {
    
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    console.log("stored_hashed: ", hash);
    console.log("generated hash: ", hashVerify);
    return hash === hashVerify;
}

function genJWT(user){
    const _id = user.id;
  
    const expiry = '1d';
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiry, algorithm: 'RS256' });
    return {
      token: "Bearer " + signedToken,
      expires: expiry
    }
  }


exports.signup = (req, res) => {
    var salt = crypto.randomBytes(64).toString('hex');
    var password = crypto.pbkdf2Sync(req.body.hashed_password, salt, 10000, 64, 'sha512').toString('base64');

    if (!isValidEmail(req.body.email)) {
        return res.json({status: 'error', message: 'Email address not formed correctly.'});
    }   
    if (!isValidPassword(req.body.hashed_password)) {
        return res.json({status: 'error', message: 'Password must be 8 or more characters.'});
    }
    
    console.log(req.body);
    models.User.findOne({where :{email: req.body.email} })
        .then((user) => {
            if (!user) {
                models.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    hashed_password: password,
                    salt: salt
                    });

                    return res.status(201).json({ success: true, msg: "User Created" });
            }else{
                res.status(400).json({ success: false, msg: "email not available" });
            }
        })
        .catch((err) => {
            next(err);
    });
}

exports.signin = (req,res, next) => {
    models.User.findOne({where :{email: req.body.email} })
    .then((user) => {
    if (!user) {
        return res.status(400).json({ success: false, msg: "User not available user" });
    }
    const isValid = validPassword(req.body.hashed_password, user.salt, user.hashed_password);
    
    if (isValid) {
        const tokenObject = genJWT(user);
        return res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
    } else {
        return res.status(401).json({ success: false, msg: "Wrong email password entered" });
    }
    })
    .catch((err) => {
        next(err);
    });
}