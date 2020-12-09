export const passwordResetHTML = () => {
    html = `
    <html>
        <head>
        </head>
        <body>
            <p>Hey ${user.firstName || user.email},</p>
            <p>We heard that you lost your Backwoods password. Sorry about that!</p>
            <p>But don’t worry! You can use the following link to reset your password:</p>
            <a href="http://127.0.0.1:8000/users/reset-password/${user._id}/${token}">Reset Password</a>
            <p>If you don’t use this link within 1 hour, it will expire.</p>
        </body>
    </html>
    `
    return html
}