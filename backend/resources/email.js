var nodemailer =  require("nodemailer");
var handlebars = require('handlebars');
//var html = require('../templates');


exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.LOGIN_EMAIL,
        pass: process.env.LOGIN_PASSWORD, 
    }
})

exports.resetPasswordTemplate = (user,token) => {
    html = passwordResetEmail(user,token)
    // var template = handlebars.compile(html);
    // var replacement = {
    //     user: user,
    //     token: token
    // }
    // var htmlToSend = template(replacement)
    return html
}

function passwordResetEmail(user,token) {
    html = `
    <html>
        <head>
        </head>
        <body>
            <p>Hey ${user.firstName || user.email},</p>
            <p>We heard that you lost your Backwoods password. Sorry about that!</p>
            <p>But don’t worry! You can use the following link to reset your password:</p>
            <a href="http://127.0.0.1:8000/users/reset-password/${user.id}/${token}">Reset Password</a>
            <p>If you don’t use this link within 1 hour, it will expire.</p>
        </body>
    </html>
    `
    return html
}



