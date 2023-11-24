const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationCode) => {

    const transporter = nodemailer.createTransport({
        // Example SMTP configuration (use your email provider's details)
        service: "gmail",
        secure: false,
        auth: {
            user: "f200376@cfd.nu.edu.pk",
            pass: 'eank crqv bovf egmb'
    },
    tls: {
        rejectUnauthorized: false
    }
    });

    await transporter.sendMail({
        from: '"D-HUBXON" f200376@cfd.nu.edu.pk',
        to: email,
        subject: 'Code Verification',
        text: `Your verification code is: ${verificationCode}`
    });
};

module.exports = { sendVerificationEmail };