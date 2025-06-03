const nodemailer = require("nodemailer");
const { createTokenPair } = require("./JWTtokenHandler")
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: "rg.hmrtech@gmail.com",
        pass: process.env.EMAIL_PASS,
    },
});


const sendVerificationEmail = async (user, origin) => {
    const now = Date.now();
    const tokenExpiryTime = now + 15 * 60 * 1000;
    const emailToken = createTokenPair({ ...user.dataValues, tokenExpiryTime });
    const verificationUrl = `${origin}/auth/verify?token=${emailToken}`;
    await sendEmail(user.email, user.first_name, user.last_name, verificationUrl);
};


const sendEmail = async (to, firstName, lastname, verificationUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Welcome to Ecommerce!",
        html: `<h2>Hello ${firstName + " " + lastname},</h2><a>Thank you for registering on our Ecommerce platform!</a><h3> <a href='${verificationUrl}'> Verify now </a> </h3>`,
    };

    await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, firstName, lastName, resetUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `
        <p>Hi ${firstName} ${lastName},</p>
        <p>You requested to reset your password. Click the link below:</p>
        <a href="${resetUrl}">Reset Your Password</a>
        <p>This link will expire in 15 minutes.</p>
    `
    };

    await transporter.sendMail(mailOptions);
};


module.exports = { sendEmail, sendVerificationEmail,sendResetPasswordEmail };
