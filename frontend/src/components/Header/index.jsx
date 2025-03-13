import React from "react";
import { Link } from "react-router-dom";
import header from "./header.module.scss";
import { MdOutlineLogin, MdAssignmentInd } from "react-icons/md";


const Header = () => {
    return <>
    <header className={header.container}>

        <Link to="/"><img src="/LogoBranca.svg" alt="Logo Odoyá" /></Link>
        <nav className={header.links}>
            <Link to="/login" className={header.link}> <MdOutlineLogin color="#114C6D" />Entrar</Link>
            <Link to="/register" className={header.link}><MdAssignmentInd color="#114C6D"/> Cadastro</Link>
        </nav>
    </header>

    </>
};

export default Header;