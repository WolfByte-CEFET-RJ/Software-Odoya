import React from "react";
import footer from "./footer.module.scss"

const Footer = () => {
    return (
        <footer className={footer.body}>
            <p>© 2025 Odoyá. Todos os direitos reservados.</p>
            <div className={footer.links}>
                <a href="#">Política de Privacidade</a><p>|</p>
                <a href="#">Termos e Condições</a><p>|</p>
                <a href="#">Link para Contato</a>
            </div>
            <img src="/LogoPreta.png" alt="" />
        </footer>
    );
};

export default Footer;