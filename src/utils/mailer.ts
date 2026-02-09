import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EMAIL, EMAIL_PORT, EMAIL_HOST, PSW_EMAIL } from '../configs/config';

const transporter = nodemailer.createTransport({
    host: EMAIL_PORT,
    port: Number(EMAIL_HOST),
    secure: true, // true for 465, false for other ports
    auth: {
        user: EMAIL,
        pass: PSW_EMAIL
    }
} as SMTPTransport.Options);

export const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
    try {
        const info = await transporter.sendMail({
            from: EMAIL,
            to,
            subject,
            html,
            text
        });
        console.log('E-mail enviado:', info.response);
        return info;
    } catch (error) {
        throw error;
    }
};
