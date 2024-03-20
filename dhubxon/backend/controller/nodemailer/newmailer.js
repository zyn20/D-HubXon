


const nodemailer = require('nodemailer');

const sendPurchaseConfirmationEmail = async (email, emailContent) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: "f200376@cfd.nu.edu.pk",
                pass: 'uulo szrc ncsg tinx'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: '"D-HUBXON" <f200376@cfd.nu.edu.pk>',
            to: email,
            subject: 'Purchase Confirmation',
            text: emailContent,
        });

        console.log(`Purchase confirmation email sent successfully to ${email}`);
    } catch (error) {
        console.error(`Error sending purchase confirmation email to ${email}:`, error);
        throw new Error('Error sending purchase confirmation email');
    }
};

module.exports = { sendPurchaseConfirmationEmail };

