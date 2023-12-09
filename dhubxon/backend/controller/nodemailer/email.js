const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const transporter = nodemailer.createTransport({
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

        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending verification email to ${email}:`, error);
        throw new Error('Error sending verification email');
    }
};

module.exports = { sendVerificationEmail };



