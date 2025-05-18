import { header } from "./partials/emailHeader";
import { footer } from "./partials/emailFooter";
import { head } from "./partials/headHtml";

export function notificationCollectionPoint(name: string, dateNotify: string, horaryNotify: string): string {
    return `
    <html>
    ${head}

    <body style="margin: 0; padding: 0; box-sizing: 0; font-family: Montserrat, Arial, sans-serif;">
        <table style="width: 100%; border-collapse: collapse;">
            <!-- Header -->
            ${header}

            <!-- Assunto do Email -->
            <tr>
                <td align="center" style="padding: 3rem;">
                    <img src="https://imgur.com/kMQorYM.png" style="height: 7.5rem; margin-bottom: 3rem;" alt="Cadeado">
                    <h1 style="color: #269bdf; font-size: 50px; font-weight: 800;">COLETA: ${name}</h1>
                    <p style="color: #269bdf; font-size: 16px; max-width: 600px; padding: 1rem;">
                        Olá, a próxima coleta do ponto de coleta "${name}", está agendada para o dia ${dateNotify} às ${horaryNotify}.
                    </p>
                </td>
            </tr>
            

            <!-- Instruções -->
            <tr>
                <td align="center">
                    <p style="color: #269bdf; font-size: 16px; max-width: 600px; margin-bottom: 4rem;">
                        Fique atento(a) para garantir que a coleta ocorra conforme o previsto.
                    </p>
                    <p style="color: #269bdf; font-size: 16px; margin-bottom: 3rem;">
                        Atenciosamente,<br>
                        Software Odoyá
                    </p>
                </td>
            </tr>

            <!-- Footer -->
            ${footer}
            
        </table>
    </body>
</html>

`
};
