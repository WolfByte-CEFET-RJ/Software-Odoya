import React from "react";
import { useState } from "react";
import { MdOutlineLogin, MdAssignmentInd, MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import header from "./header.module.scss";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={header.container}>
            <Link to="/">
                <img src="/LogoBranca.svg" alt="Logo Odoyá" />
            </Link>
            <button className={header.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <MdClose size={30} color="#fff" /> : <MdMenu size={30} color="#fff" />}
            </button>
            <nav className={`${header.links} ${menuOpen ? header.open : ""}`}>
                <Link to="/login" className={header.link} onClick={() => setMenuOpen(false)}>
                    <MdOutlineLogin color="#114C6D" />Entrar
                </Link>
                <Link to="/register" className={header.link} onClick={() => setMenuOpen(false)}>
                    <MdAssignmentInd color="#114C6D" /> Cadastro
                </Link>
            </nav>
        </header>
    );
};

export default Header;