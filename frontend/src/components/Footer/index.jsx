
import { AiFillTikTok } from "react-icons/ai"; 
import { RiInstagramFill } from "react-icons/ri"; 
import { RxLinkedinLogo } from "react-icons/rx"; 
import footer from "./footer.module.scss"; 

function redirect(path) {
    switch(path) {
        case "instagram": window.location.href = "https://www.instagram.com/odoya.projeto/"; break;
        case "linkedin": window.location.href = "https://www.linkedin.com/in/odoy%C3%A1-projeto-083040291/"; break; 
        case "tiktok": window.location.href = "https://www.tiktok.com/@odoya.projeto"; break; 
    } 
} 

const Footer = () => {
    return ( 
    <footer className={footer.body}> 
        <div className={footer.copyright}> 
            <p>© 2025 Odoyá. Todos os direitos reservados.</p> 
        </div> 
        
        <div> 
            <p>Siga-nos em:</p> 
            <div className={footer.redes}> 
                <RiInstagramFill color="#4d4d4d" size={35} /> 
                <a onClick={() => redirect("instagram")}>@odoya</a> 
                <RxLinkedinLogo color="#4d4d4d" size={35} /> 
                <a onClick={() => redirect("linkedin")}>@odoya</a> 
                <AiFillTikTok color="#4d4d4d" size={40} /> 
                <a onClick={() => redirect("tiktok")}>@odoya</a> 
            </div> 
        </div> 
        <img src="/LogoPreta.png" alt="Logotipo Odoya" /> 
    </footer> 
    ); 
}; 

import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2025 Odoyá. Todos os direitos reservados.</p>
            <div>
                <a href="#">Política de Privacidade</a>
                <a href="#">Termos e Condições</a> 
                <a href="#">Link para Contato</a>
            </div>
            <div>
                <p>Siga-nos em:</p>
                <div>
                    <a href="#">@odoya</a>
                    <a href="#">@odoya</a>
                    <a href="#">@odoya</a>
                </div>
            </div>
            <img src="/LogoPreta.png" alt="" />
        </footer>
    );
};


export default Footer;