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

exports.forgotPasswordEmail = (req, res, next) => {
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
            text: template,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Error sending email", err);
                //return res.status(500).json({ success: false, msg: "Error sending email" });
            }else {
                console.log('Email sent:' + info.response);
                //return res.status(200).json({ success: true, msg: "Email successfuly sent" });
            }
        });
    })
    .catch((err) => {
        next(err);
    });
    next();
}

exports.recieveNewPassword = (req, res) => {
    const {userId, token} =  req.params;
    const {password} = req.body;
    models.User.findByPk(userId)
    .then(user =>{
        const secret = user.hashed_password;
        const payload = jwt.decode(token, secret);
        if(payload.userId === user.id){
            console.log("Password:", password);
            var salt = crypto.randomBytes(64).toString('hex');
            var hashedpassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
            user.hashed_password = hashedpassword;
            user.save();
            res.status(200).json("Password successfuly changed");
            // models.User.findOneAndUpdate({_id: userId}, {password: hashed_password})
            // .then(() => res.status(202).json("Password changed"))
            // .catch(err => {console.log(err);res.status(500).json(err)})
        }
    })
    .catch((err) => {
        res.status(404).json("Invalid User err");
    })
}