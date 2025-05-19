import { header } from "./partials/emailHeader";
import { footer } from "./partials/emailFooter";
import { head } from "./partials/headHtml";

export function recoveryPassword(password: string): string {
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
                    <img src="https://res.cloudinary.com/dou9xyiev/image/upload/v1747668749/cadeado_segelm.png" style="height: 7.5rem; margin-bottom: 3rem;" alt="Cadeado">
                    <h1 style="color: #269bdf; font-size: 50px; font-weight: 800;">RECUPERAÇÃO DE SENHA</h1>
                    <p style="color: #269bdf; font-size: 16px;">
                        Olá, você solicitou a recuperação de senha da sua conta.<br>
                    Aqui está sua nova senha temporária:
                    </p>
                </td>
            </tr>
            
            <!-- Senha -->
            <tr>
                <td align="center">
                    <div style="display: inline-block; border: 3px solid #269bdf; padding: 1rem 5rem 1rem 5rem; color: #269bdf; font-size: 30px; font-weight: bold;">
                        ${password}
                    </div>
                </td>
            </tr>

            <!-- Instruções -->
            <tr>
                <td align="center">
                    <p style="color: #269bdf; font-size: 16px; max-width: 600px; padding-top: 3rem;">
                        Recomendamos que você acesse sua conta e altere essa senha temporária assim que possível, através da opção de alteração de senha no seu perfil.<br>
Se você não solicitou essa alteração, por favor ignore este e-mail.
                    </p>
                    <p style="color: #269bdf; font-size: 16px; margin-top: 3rem;">
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
