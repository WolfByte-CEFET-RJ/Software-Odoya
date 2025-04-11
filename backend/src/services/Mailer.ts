import { createTransport, Transporter } from 'nodemailer';
import "dotenv/config";

export default class Mailer {
    private transporter: Transporter;

    constructor(){
        this.transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASS
            }
        })
    }

    public async sendMail(to: string, subject: string, text: string) {
        console.log(to, subject, text);
        
        const info = await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });

        console.log("Email enviado: ", info.messageId);
    }
}