import { createTransport, Transporter } from 'nodemailer';
import "dotenv/config";
import { recoveryPassword } from '../emails/recoveryPassword';
import { notificationCollectionPoint } from '../emails/notificationCollectionPoint';

export default class Mailer {
    private transporter: Transporter;

    constructor(){
        this.transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_APP_USER,
                pass: process.env.EMAIL_APP_PASS
            }
        })
    }

    public async sendMail(to: string, subject: string, text: string) {
        let html;
        console.log(to, subject);
        
        if (subject == "Recuperação de senha") {
            html = recoveryPassword(text);
        }

        else {
            const [name, dateNotify, horaryNotify] = text.split(",").map(n => n.trim());
            html = notificationCollectionPoint(name, dateNotify, horaryNotify);
        }

        const info = await this.transporter.sendMail({
            from: `"Software Odoyá" <${process.env.EMAIL_APP_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email enviado: ", info.messageId);
    }
}