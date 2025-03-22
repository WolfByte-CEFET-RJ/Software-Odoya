import React from "react";
import { AiFillTikTok } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { RxLinkedinLogo } from "react-icons/rx";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="copyright">
                <p>© 2025 Odoyá. Todos os direitos reservados.</p>
            </div>
            <div>
                <a href="#">Política de Privacidade</a>
                <a href="#">Termos e Condições</a> 
                <a href="#">Link para Contato</a>
            </div>
            <div>
                <p>Siga-nos em:</p>
                <div className="redes">
                    <RiInstagramFill size={25} />
                    <a href="#">@odoya</a>
                    <RxLinkedinLogo size={25} />
                    <a href="#">@odoya</a>
                    <AiFillTikTok size={30} />
                    <a href="#">@odoya</a>
                </div>
            </div>
            <img src="/LogoPreta.png" alt="" />
        </footer>
    );
};

export default Footer;