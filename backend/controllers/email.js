const models = require('../models/index');
const {transporter, resetPasswordTemplate} = require("../resources/email");
const jwt = require('jsonwebtoken');
var crypto = require('crypto');

function createToken(user) {
    const hashedPassword = user.hashed_password;
    const userId = user.id;
    const secret = hashedPassword;
    const token = jwt.sign({userId}, secret,{expiresIn:3600});
    return token
}

exports.forgotPasswordEmail = (req, res) => {
    
    let email = req.body.email
    models.User.findOne({where :{email:email} })
    .then((user) => {
        if (!user) {
            return res.status(404).json({ success: false, msg: "Incorrect email entered" });
        }
        const token = createToken(user);
        const template = resetPasswordTemplate(user,token)
        var mailOptions = {
            from: process.env.LOGIN_EMAIL,
            to: email,
            subject: 'Password Reset',
            html: template,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Error sending email", err);
                return res.status(500).json({ success: false, msg: "Error sending email" });
            }else {
                console.log('Email sent:' + info.response);
                return res.status(200).json({ success: true, msg: "Email successfuly sent" });
            }
        });
    })
    .catch((err) => {
        console.log("user not foud",err)
        next(err);
    });
    
}

exports.recieveNewPassword = (req, res) => {
    const {userId, token} =  req.params;
    console.log("user id:", userId);
    console.log("token:", token)
    const {password} = req.body;
    models.User.findByPk(userId)
    .then(user =>{
        console.log("user has been found:", user);
        const secret = user.hashed_password;
        const payload = jwt.decode(token, secret);
        if(payload.userId === user.id){
            console.log("Password:", password);
            var salt = user.salt;
            var hashedpassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            user.hashed_password = hashedpassword;
            user.save();
            return res.status(200).json({ success: true, msg: "Password successfully changed" });

        }
    })
    .catch((err) => {
        return res.status(404).json({error:err});
    })
}