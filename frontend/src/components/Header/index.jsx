import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineLogin, MdAssignmentInd, MdMenu, MdClose, MdRestoreFromTrash, MdGroups, MdAccountCircle, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import header from "./header.module.scss";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("id")) {
            setIsLoggedIn(true)
        }
    })

    return (
        <header className={header.container}>
            {isLoggedIn ? (
                <>
                    <Link to="/">
                        <img src="/LogoBranca.svg" alt="Logo Odoyá" />
                    </Link>
                    <button className={header.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <MdClose size={30} color="#fff" /> : <MdMenu size={30} color="#fff" />}
                    </button>
                    <nav className={`${header.links} ${menuOpen ? header.open : ""}`}>
                        <Link to={"/profile"} className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdAccountCircle color="#114C6D"/>Perfil
                        </Link>
                        <Link className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdLogout color="#114C6D"/>Sair
                        </Link>
                    </nav>
                </>
            ) : (
                <>
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
                </>)}
        </header>
    );
};

export default Header;