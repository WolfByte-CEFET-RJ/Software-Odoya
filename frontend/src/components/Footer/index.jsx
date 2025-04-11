import React from "react";
import { AiFillTikTok } from "react-icons/ai"; 
import { RiInstagramFill } from "react-icons/ri"; 
import { RxLinkedinLogo } from "react-icons/rx"; 
import footer from "./footer.module.scss"; 

function redirect(path) {
    switch(path) { // colocar links pras redes do projeto aqui
        case "instagram": window.location.href = ""; break;
        case "linkedin": window.location.href = ""; break; 
        case "tiktok": window.location.href = ""; break; 
    } 
} 
const Footer = () => {
    return ( 
    <footer className={footer.body}> 
        <div className={footer.copyright}> 
            <p>© 2025 Odoyá. Todos os direitos reservados.</p> 
        </div> 
        <div className={footer.copyrightLinks}> 
            <a href="#">Política de Privacidade</a><p>|</p> 
            <a href="#">Termos e Condições</a><p>|</p> 
            <a href="#">Link para Contato</a> 
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
        <img src="/LogoPreta.png" alt="" /> 
    </footer> 
    ); 
}; 

export default Footer;