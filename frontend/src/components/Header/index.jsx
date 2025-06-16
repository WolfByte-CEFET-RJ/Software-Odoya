 
import React from "react";
import { useEffect, useState } from "react";
import { MdOutlineLogin, MdAssignmentInd, MdMenu, MdClose, MdHomeFilled, MdAccountCircle, MdLogout, MdEngineering, MdCollectionsBookmark } from "react-icons/md";
import { Link } from "react-router-dom";
import header from "./header.module.scss";
import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import { FaLeaf } from "react-icons/fa";
import MetricsModal from "../MetricsModal"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMetrics, setShowMetrics] = useState(false);
    
    
    
    const {admin, logout, token, root, client} = useContext(UserContext)
    
    useEffect(() =>{
        
        if(token && client){
            setIsLoggedIn(true)
        }
    },[client])
    
    const handleLogout = () => {
        logout(); 
    };

    return (
        <>
            <header className={header.container}>
            
            
            <img src="/LogoBranca.svg" alt="Logo Odoyá" />
            
            
            <button className={header.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <MdClose size={30} color="#fff" /> : <MdMenu size={30} color="#fff" />}
            </button>
            <nav className={`${header.links} ${menuOpen ? header.open : ""}`}>
                {isLoggedIn ? (
                <>
                
                    <Link to={"/home"} className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdHomeFilled color="#114C6D" />Tela inicial
                        </Link>
                        
  
                    
                    <Link to={"/profile"} className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdAccountCircle color="#114C6D" />Perfil
                        </Link>
                         
                    {admin == true ? (
                    <>
                       
                         {/* <Link to={"/"} className={header.link} onClick={() => setMenuOpen(false)}>
                            <MdCollectionsBookmark color="#114C6D" />Relatórios
                        </Link> */}
                       {root === true ? (

                            <>
                                <Link to={"/rh"} className={header.link} onClick={() => setMenuOpen(false)}>
                                    <MdEngineering color="#114C6D" />Recursos Humanos
                                </Link>
                            </>
                            ) : (
                            <></>
                        )} 
                        <div className={header.link} onClick={() => {setShowMetrics(true)}}>
                                <FaLeaf color="#114C6D" />
                                Métricas
                            </div> 
                        
  
                    </>
                    ) : (
                    <>
                        

                        

                            

                     
                    </>
                    )}
                    <Link className={header.link} onClick={handleLogout}>
                            <MdLogout color="#114C6D" />Sair
                        </Link>
                </>
                ) : (
                <>
                    <Link to="/login" className={header.link} onClick={() => setMenuOpen(false)}>
                    <MdOutlineLogin color="#114C6D" />Entrar
                    </Link>
                    <Link to="/register" className={header.link} onClick={() => setMenuOpen(false)}>
                    <MdAssignmentInd color="#114C6D" />Cadastro
                    </Link>
                </>
                )}

            </nav>
        </header>

        <MetricsModal open={showMetrics} onClose={() => setShowMetrics(false)} />

        </>
        
    );
};

export default Header;
