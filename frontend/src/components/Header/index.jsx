/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";

import { MdOutlineLogin, MdAssignmentInd, MdMenu, MdClose, MdRestoreFromTrash, MdGroups, MdHomeFilled, MdAccountCircle, MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import header from "./header.module.scss";

import { useContext } from "react";
import { UserContext } from "../Context/userContext";



const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const location = useLocation();
    const currentLocation = location.pathname;
    
    

    const {admin, logout, token} = useContext(UserContext)
    
    
    useEffect(() =>{
        
        if(token){
            setIsLoggedIn(true)
        }
        
       
    },[token])
    
   const handleLogout = () => {
        logout(); 
      };
  

    return (
        <header className={header.container}>
            <img src="/LogoBranca.svg" alt="Logo Odoyá" />
            <button className={header.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <MdClose size={30} color="#fff" /> : <MdMenu size={30} color="#fff" />}
            </button>
            <nav className={`${header.links} ${menuOpen ? header.open : ""}`}>
                {isLoggedIn ? (
                    <>
                        {admin == false ? (
                            <>
                            {currentLocation === "/profile" ? (
                                <>
                                <Link to={"/"}className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>Tela inicial
                                </Link>
                                </>
                            ) : (
                                <>
                                <Link to={"/profile"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdAccountCircle color="#114C6D"/>Perfil
                                </Link>
                                </>
                            )}
                            <Link  className={header.link} onClick={handleLogout}>
                               <MdLogout color="#114C6D" />Sair
                            </Link>
                            </>
                        ) : (
                            <>
                            {currentLocation === "/profile" && ( 
                                <>
                                <Link to={"/rh"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>RH
                                </Link>
                                <Link to={"/"}className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>Relatórios
                                </Link>
                                <Link to={"/"}className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>Tela inicial
                                </Link>
                                </>
                            )}
                             {currentLocation === "/rh" && ( 
                                <>
                                <Link to={"/profile"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>Perfil
                                </Link>
                                <Link to={"/"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>Relatórios
                                </Link>
                                <Link to={"/"}className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdHomeFilled color="#114C6D"/>Tela inicial
                                </Link>
                                </>
                            )}
                            <Link  className={header.link} onClick={handleLogout}>
                                <MdLogout color="#114C6D" />Sair
                            </Link>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login" className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdOutlineLogin color="#114C6D" />Entrar
                        </Link>
                        <Link to="/register" className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdAssignmentInd color="#114C6D" /> Cadastro
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
